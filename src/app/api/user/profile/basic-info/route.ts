import prisma from "@/lib/prisma";
// import BasicDetailsSchema from "@/schema/basicDetailsSchema";
import { authenticateUser } from "@/server/authenticateUser";
import { handleZodErrorResponse } from "@/server/handleZodErrorResponse";
import { sendErrorResponse, sendSuccessResponse } from "@/server/response";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {
        const session = await authenticateUser();

        const requestData = await req.json();
        const data = requestData;
        // const data = BasicDetailsSchema
        //     .parse(requestData);

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
                success: false,
                message: "Consultant not found",
            });
        }

        return sendSuccessResponse({
            success: true,
            message: "Consultant details updated successfully",
        });
    } catch (error: any) {
        if (error instanceof ZodError) {
            return handleZodErrorResponse(error);
        } else {
            console.log("Error updating details", error.message || error);
            return sendErrorResponse({
                success: false,
                message: "Error updating details",
                error: error.message || error,
            });
        }
    }
}
