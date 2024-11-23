import { auth } from "@/lib/auth";
import { Session, User } from "next-auth";
import { sendErrorResponse } from "./response";

export async function authenticateUser(): Promise<Session & { user: User }> {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return sendErrorResponse({
                success: false,
                message: "User not authenticated",
                status: 401,
            }) as unknown as Promise<Session & { user: User }>;
        }

        return session as Session & { user: User };
    } catch (error) {
        return sendErrorResponse({
            success: false,
            message: "Internal server error",
        }) as unknown as Promise<Session & { user: User }>;
    }
}
