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

export default getErrorMessage;
