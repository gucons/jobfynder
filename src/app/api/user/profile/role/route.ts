import prisma from "@/lib/prisma";
import handleRouteWithAuth from "@/server/handleAPIRouteAuth";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/server/handleRouteResponse";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export const POST = handleRouteWithAuth(async (req, session) => {
  const requestData = await req.json();
  const { role } = z
    .object({
      role: z.nativeEnum(UserRole),
    })
    .parse(requestData);

  const user = await prisma.user.update({
    where: {
      id: session.user.id,
      email: session.user.email as string,
    },
    data: { role },
  });

  if (!user) {
    return sendErrorResponse({
      message: "User not found",
    });
  }

  return sendSuccessResponse({
    message: "User role updated successfully",
  });
});
