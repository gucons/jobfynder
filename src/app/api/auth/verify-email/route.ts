import prisma from "@/lib/prisma";
import handleRouteWithAuth from "@/server/handleAPIRouteAuth";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "@/server/handleRouteResponse";
import { z } from "zod";

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
          code: data.code,
          expiry: {
            gte: new Date(), // Ensure expiry date is greater than current date
          },
          purpose: "EMAIL_VERIFICATION",
        },
      },
    },
  });

  // Check if the OTP is valid
  if (!user || !user.OTP || user.OTP.length === 0) {
    return sendErrorResponse({
      message: "Invalid OTP",
    });
  }

  // Update the user's email verification status
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      emailVerified: true,
    },
  });

  return sendSuccessResponse({
    message: "Email verified successfully",
  });
});
