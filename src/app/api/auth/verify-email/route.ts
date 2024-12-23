import { env } from '@/env';
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
      code: z
        .string()
        .length(6)
        .regex(/^\d{6}$/),
      // Ensure that the code is a 6 digit number
    })
    .parse(rawData);

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      email: true,
      OTP: {
        where: {
          expiry: {
            gte: new Date(), // Ensure expiry date is greater than current date
          },
          purpose: 'EMAIL_VERIFICATION',
        },
        select: {
          code: true,
          usageCount: true,
        },
      },
    },
  });

  // Check if the OTP is valid
  if (
    !user ||
    !user.OTP ||
    user.OTP.length === 0 // No OTP found (OTP has expired)
  ) {
    return sendErrorResponse({
      message: 'Invalid OTP',
      status: 400,
    });
  }

  // Check if the OTP code is correct and increment the usage count
  if (user.OTP[0].code !== data.code) {
    await prisma.oTP.update({
      where: {
        userId_purpose: {
          userId: session.user.id,
          purpose: 'EMAIL_VERIFICATION',
        },
      },
      data: {
        usageCount: {
          increment: 1,
        },
      },
    });

    return sendErrorResponse({
      message: 'Invalid OTP',
      status: 400,
    });
  }

  // Check if the OTP has been used more than MAX_USES
  if (user.OTP[0].usageCount >= env.EMAIL_OTP_MAX_USES) {
    return sendErrorResponse({
      message: 'OTP has been used too many times, please request a new one',
      status: 429,
    });
  }

  // Update the user's email verification status and OTP used status
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      emailVerified: true,
      OTP: {
        update: {
          where: {
            userId_purpose: {
              userId: session.user.id,
              purpose: 'EMAIL_VERIFICATION',
            },
          },
          data: {
            used: true,
          },
        },
      },
    },
  });

  return sendSuccessResponse({
    message: 'Email verified successfully',
    status: 201,
  });
});
