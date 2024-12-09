import { auth } from "@/server/auth";
import { Session, User } from "next-auth";
import { sendErrorResponse } from "./handle-route-response";

export async function authenticateUser(): Promise<Session & { user: User }> {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id || !session.user.email) {
      return sendErrorResponse({
        message: "User not authenticated",
        status: 401,
      }) as unknown as Promise<Session & { user: User }>;
    }

    return session as Session & { user: User };
  } catch (error: unknown) {
    return sendErrorResponse({
      message: "Internal server error",
    }) as unknown as Promise<Session & { user: User }>;
  }
}
