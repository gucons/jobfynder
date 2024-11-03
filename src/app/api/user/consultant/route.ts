import prisma from "@/lib/prisma";
import ConsultantSchema from "@/schema/consultantSchema";
import { authenticateUser } from "@/server/authenticateUser";
import { handleZodErrorResponse } from "@/server/handleZodErrorResponse";
import { sendErrorResponse, sendSuccessResponse } from "@/server/response";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await authenticateUser();

        const requestData = await req.json();
        const data = ConsultantSchema.parse(requestData);

        const consultant = await prisma.consultant.upsert({
            where: {
                userId: session.user.id,
            },
            update: {
                ...data,
                education: {
                    set: data.education ? data.education.map((edu: any) => ({ ...edu })) : [],
                },
            },
            create: {
                ...data,
                education: {
                    create: data.education ? data.education.map((edu: any) => ({ ...edu })) : [],
                },
                userId: session.user.id,
            },
        });

        if (!consultant) {
            return sendErrorResponse({
                success: false,
                message: "Consultant not found",
            });
        }

        return sendSuccessResponse({
            success: true,
            message: "Consultant details updated successfully",
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return handleZodErrorResponse(error);
        } else {
            console.log("Error updating user role", error.message || error);
            return sendErrorResponse({
                success: false,
                message: "Error updating user role",
                error: error.message || error,
            });
        }
    }
}