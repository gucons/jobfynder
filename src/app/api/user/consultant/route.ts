import prisma from "@/lib/prisma";
import ConsultantSchema from "@/schema/consultantSchema";
import handleRouteWithAuth from "@/server/handle-auth-route";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/server/handle-route-response";

export const POST = handleRouteWithAuth(async (req, session) => {
  const requestData = await req.json();
  const data = ConsultantSchema.parse(requestData);

  const consultant = await prisma.consultant.upsert({
    where: {
      userId: session.user.id,
    },
    update: {
      ...data,
      education: {
        deleteMany: {}, // Clear all previous education entries
        create: data.education
          ? data.education.map((edu: any) => ({
              institution: edu.institution,
              major: edu.major,
              year: edu.year,
            }))
          : [],
      },
    },
    create: {
      ...data,
      education: {
        create: data.education
          ? data.education.map((edu: any) => ({
              institution: edu.institution,
              major: edu.major,
              year: edu.year,
            }))
          : [],
      },
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
