import { getErrorMessage } from "@/lib/handle-error";
import { Session } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "./auth";

const authenticateUser = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id || !session.user.email) {
    throw new Error("User not authenticated");
  }
  return session;
};

const handleRouteWithAuth = (
  fn: (req: Request, session: Session) => Promise<Response>
) => {
  return async (req: Request) => {
    try {
      // Authenticate the user
      const session = await authenticateUser();

      // Pass the authenticated session to the route handler
      return await fn(req, session);
    } catch (error: unknown) {
      if (process.env.NODE_ENV === "development")
        console.error("Error in route handler:", error);

      // Handle authentication errors or other unexpected errors
      const status =
        (error as Error)?.message === "User not authenticated" ? 401 : 500;
      const errorMessage = getErrorMessage(error);
      return NextResponse.json(
        {
          success: false,
          error:
            process.env.NODE_ENV === "development"
              ? errorMessage
              : "An error occurred. Please try again later.",
        },
        { status: status }
      );
    }
  };
};

export default handleRouteWithAuth;
