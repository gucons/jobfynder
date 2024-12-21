import { getErrorMessage } from "@/lib/handle-error";
import { NextResponse } from "next/server";
import { sendErrorResponse } from "./handle-route-response";

const handleRoute = (fn: (req: Request) => Promise<Response>) => {
  return async (req: Request) => {
    try {
      return await fn(req);
    } catch (error) {
      if (process.env.NODE_ENV === "development")
        console.error("Error in route handler:", error);

      // Build user-friendly error response
      const errorMessage = getErrorMessage(error);
      return sendErrorResponse({
        message: getErrorMessage(error),
        error: error as Error,
      });
    }
  };
};

export default handleRoute;
