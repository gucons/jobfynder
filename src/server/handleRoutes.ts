import { NextApiRequest } from "next";
import { isRedirectError } from "next/dist/client/components/redirect";
import { ZodError } from "zod";
import { sendErrorResponse } from "./handle-route-response";

export function getErrorMessage(err: unknown): string {
  const unknownError = "Internal server error";

  if (err instanceof ZodError) {
    // Handle Zod validation errors
    const errors = err.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    return `Validation Error:\n${errors.join("\n")}`;
  }

  if (err instanceof SyntaxError) {
    // Handle JSON parse or syntax errors
    return `Syntax Error: ${err.message}`;
  }

  if (err instanceof Error) {
    // Handle generic errors
    return `Error: ${err.message}`;
  }

  if (isRedirectError(err)) {
    // Pass through redirect errors
    throw err;
  }

  if (typeof err === "string") {
    // Handle string-based errors
    return err;
  }

  if (typeof err === "object" && err !== null && "message" in err) {
    // Handle unexpected error objects with a `message` property
    return (err as any).message;
  }

  // Default to unknown error message
  return unknownError;
}

const handleRoute = (fn:(req: NextApiRequest) => Promise<unknown>) => {
  return async (req: NextApiRequest) => {
    try {
      await fn(req);
    } catch (error) {
      return sendErrorResponse({
        message: getErrorMessage(error),
        error: error,
        status: 500,
      });
    }
  };
};

export default handleRoute;
