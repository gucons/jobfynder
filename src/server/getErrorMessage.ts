import { ZodError } from "zod";

function getErrorMessage(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
  }

  if (error instanceof SyntaxError) {
    return `Syntax Error: ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  // Safely handle generic objects with a 'message' field
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as any).message); // Type-safe fallback
  }

  return "Internal server error";
}

export default getErrorMessage;
