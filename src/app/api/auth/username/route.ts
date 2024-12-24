import prisma from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { UsernameValidationSchema } from '@/schema/basicDetailsSchema';
import handleRouteWithAuth from '@/server/handleAPIRouteAuth';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/server/handleRouteResponse';
import { z } from 'zod';

export const POST = handleRouteWithAuth(async (req, session) => {
  // Apply stricter rate limiting for availability checking
  const identifier = `${session.user.id}_username_check`;
  const { success } = await rateLimit(identifier);
  if (!success) {
    return sendErrorResponse({
      message: 'Too many requests. Please wait before checking again.',
      status: 429,
    });
  }

  const data = z
    .object({
      username: UsernameValidationSchema,
    })
    .parse(await req.json());

  // Check username availability
  const [usernameExists, pendingUsernameExists] = await Promise.all([
    prisma.user.findFirst({
      where: { username: data.username },
      select: { id: true },
    }),
    prisma.pendingUser.findFirst({
      where: {
        username: data.username,
        NOT: { id: session.user.id },
      },
      select: { id: true },
    }),
  ]);

  const isAvailable = !usernameExists && !pendingUsernameExists;

  return sendSuccessResponse({
    message: isAvailable
      ? 'Username is available'
      : 'Username is already taken',
    data: {
      username: data.username,
      available: isAvailable,
    },
  });
});
