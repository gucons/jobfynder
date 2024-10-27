import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { authenticateUser } from "@/server/authenticateUser";
import { sendErrorResponse, sendSuccessResponse } from "@/server/response";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await authenticateUser();

        const requestData = await req.json();
        const { role } = z
            .object({
                role: z.nativeEnum(UserRole),
            })
            .parse(requestData);

        const user = await prisma.user.update({
            where: {
                email: session.user.email as string,
            },
            data: { role },
        });

        if (!user) {
            return sendErrorResponse({
                success: false,
                message: "User not found",
            });
        }

        return sendSuccessResponse({
            success: true,
            message: "User role updated successfully",
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return sendErrorResponse({
                success: false,
                message: "Invalid request data",
                error: error.errors,
            });
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
