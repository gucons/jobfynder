import { NextResponse } from "next/server";
import getErrorMessage from "./getErrorMessage";

const handleRoute = (fn: (req: Request) => Promise<Response>) => {
  return async (req: Request) => {
    try {
      return await fn(req);
    } catch (error) {
      if (process.env.NODE_ENV === "development")
        console.error("Error in route handler:", error);

      // Build user-friendly error response
      const errorMessage = getErrorMessage(error);
      return NextResponse.json(
        {
          success: false,
          message: "Internal server error",
          error:
            process.env.NODE_ENV === "development"
              ? errorMessage
              : // Return a generic message to not expose internal errors (e.g. database errors)
                "An error occurred. Please try again later.",
        },
        { status: 500 }
      );
    }
  };
};

export default handleRoute;
