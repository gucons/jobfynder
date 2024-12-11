import { getErrorMessage } from "@/lib/handle-error";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

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
          error:
            process.env.NODE_ENV === "development"
              ? errorMessage
              : "An error occurred. Please try again later.",
        },
        { status: 500 }
      );
    }
  };
};

export default handleRoute;
