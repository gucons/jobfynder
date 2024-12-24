import prisma from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { UserDetailsSchema } from '@/schema/userDetailsSchema';
import handleRouteWithAuth from '@/server/handleAPIRouteAuth';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/server/handleRouteResponse';

export const POST = handleRouteWithAuth(async (req, session) => {
  // Apply rate limiting
  const identifier = session.user.id;
  const { success } = await rateLimit(identifier);
  if (!success) {
    return sendErrorResponse({
      message: 'Too many requests. Please try again later.',
      status: 429,
    });
  }

  // Validate input
  const rawData = await req.json();
  const data = UserDetailsSchema.parse(rawData);

  const pendingUser = await prisma.pendingUser.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      emailVerified: true,
    },
  });

  if (!pendingUser) {
    return sendErrorResponse({
      message: 'User not found',
      status: 404,
    });
  }
  if (!pendingUser.emailVerified) {
    return sendErrorResponse({
      message: 'Email not verified',
      status: 403,
    });
  }

  // Use a transaction to update the pending user
  await prisma.$transaction(async (tx) => {
    const [usernameExists, pendingUsernameExists] = await Promise.all([
      tx.user.findFirst({
        where: { username: data.username },
        select: { id: true },
      }),
      tx.pendingUser.findFirst({
        where: {
          username: data.username,
          NOT: { id: session.user.id },
        },
        select: { id: true },
      }),
    ]);

    if (usernameExists || pendingUsernameExists) {
      return sendErrorResponse({
        message: 'Username is already taken',
        status: 400,
      });
    }

    await tx.pendingUser.update({
      where: { id: session.user.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        bio: data.bio,
      },
      select: { id: true },
    });
  });

  return sendSuccessResponse({
    message: 'Basic details saved successfully',
  });
});
