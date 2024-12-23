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

  // Check if user and OTP exist
  if (!user || !user.OTP) {
    return sendErrorResponse({
      message: 'No verification code found. Please request a new code.',
      status: 404,
    });
  }

  // Check if OTP is expired (array empty due to gte filter)
  if (user.OTP.length === 0) {
    return sendErrorResponse({
      message: 'Verification code has expired. Please request a new code.',
      status: 410,
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
      message: 'Incorrect verification code. Please try again.',
      status: 400,
    });
  }

  // Check if the OTP has been used more than MAX_USES
  if (user.OTP[0].usageCount >= env.EMAIL_OTP_MAX_USES) {
    return sendErrorResponse({
      message: 'OTP has been used too many times. Please request a new code.',
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
