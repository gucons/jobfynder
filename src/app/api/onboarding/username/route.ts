import prisma from '@/lib/prisma';
import handleRouteWithAuth from '@/server/handleAPIRouteAuth';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/server/handleRouteResponse';
import { z } from 'zod';

export const POST = handleRouteWithAuth(async (req, session) => {
  const rawData = await req.json();

  const data = z
    .object({
      username: z.string().min(3).max(20),
    })
    .parse(rawData);

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

  // Check if username is available for both pending user and user
  const usernameExists = await prisma.user.findFirst({
    where: {
      username: data.username,
    },
    select: {
      id: true,
    },
  });
  const pendingUsernameExists = await prisma.pendingUser.findFirst({
    where: {
      username: data.username,
    },
    select: {
      id: true,
    },
  });

  if (usernameExists || pendingUsernameExists) {
    return sendErrorResponse({
      message: 'Username is already taken',
    });
  }

  // Save username to pending user
  await prisma.pendingUser.update({
    where: {
      id: session.user.id,
    },
    data: {
      username: data.username,
    },
    select: {
      id: true,
    },
  });

  return sendSuccessResponse({
    message: 'Username saved successfully',
  });
});
