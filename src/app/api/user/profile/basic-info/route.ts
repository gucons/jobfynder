import prisma from "@/lib/prisma";
import BasicDetailsSchema from "@/schema/basicDetailsSchema";
import { authenticateUser } from "@/server/authenticateUser";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/server/handle-route-response";
import handleRoute from "@/server/handleRoutes";

export async function POST(req: Request) {
  handleRoute(async () => {
    const session = await authenticateUser();

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
}
