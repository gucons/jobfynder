import { NextResponse } from "next/server";

type ErrorResponseType = {
  message: string;
  error?: unknown;
  status?: number;
};

export function sendErrorResponse(params: ErrorResponseType) {
  return NextResponse.json(
    {
      success: false,
      message: params.message || "Internal server error",
      description: (params.error as Error)?.message,
    },
    {
      status: params.status || 500,
    }
  );
}

type SuccessResponseType = {
  message: string;
  status?: number;
  data?: any;
};

export function sendSuccessResponse(params: SuccessResponseType) {
  return NextResponse.json(
    {
      success: true,
      message: params.message,
      data: params.data,
    },
    {
      status: params.status || 200,
    }
  );
}
