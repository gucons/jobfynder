import prisma from "@/lib/prisma";
import BasicDetailsSchema from "@/schema/basicDetailsSchema";
import handleRouteWithAuth from "@/server/handle-auth-route";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/server/handle-route-response";

export const POST = handleRouteWithAuth(async (req, session) => {
  const requestData = await req.json();
  const data = BasicDetailsSchema.parse(requestData);

  const consultant = await prisma.basicInfo.upsert({
    where: {
      userId: session.user.id,
    },
    update: {
      ...data,
    },
    create: {
      ...data,
      userId: session.user.id,
    },
  });

  if (!consultant) {
    return sendErrorResponse({
      message: "Consultant not found",
    });
  }

  return sendSuccessResponse({
    message: "Consultant details updated successfully",
  });
});
