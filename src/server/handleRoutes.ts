import { NextResponse } from "next/server";
import { ZodError } from "zod";

function getErrorMessage(err: unknown): string {
  if (err instanceof ZodError) {
    return err.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
  }

  if (err instanceof SyntaxError) {
    return `Syntax Error: ${err.message}`;
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === "string") {
    return err;
  }

  // Safely handle generic objects with a 'message' field
  if (typeof err === "object" && err !== null && "message" in err) {
    return String((err as any).message); // Type-safe fallback
  }

  return "Internal server error";
}

const handleRoute = (fn: (req: Request) => Promise<Response>) => {
  return async (req: Request) => {
    try {
      return await fn(req);
    } catch (error) {
      // Log full error for debugging
      if (error) {
        console.error("Error in route handler:", error);
      }

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
