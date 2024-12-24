import { NextResponse } from 'next/server';

type SuccessParams = {
  message: string;
  description?: string;
  status?: number;
  data?: unknown;
};

type ErrorParams = {
  message: string;
  error?: Error;
  status?: number;
};

export function sendSuccessResponse(params: SuccessParams) {
  const response = {
    success: true,
    message: params.message,
    description: params.description,
    data: params.data,
  };

  return NextResponse.json(response, {
    status: params.status || 200,
  });
}

export function sendErrorResponse(params: ErrorParams) {
  const response = {
    success: false,
    message: params.message,
    error:
      process.env.NODE_ENV === 'development'
        ? params.error?.message
        : undefined, // Only show error details in development mode
  };

  return NextResponse.json(response, {
    status: params.status || 500,
  });
}

// Documentation for frontend responses

/**
 * sendSuccessResponse
 * @param {Object} params - The parameters for the success response.
 * @param {string} params.message - The success message.
 * @param {number} [params.status=200] - The HTTP status code (default is 200).
 * @param {JSON} [params.data] - The data to be sent in the response.
 *
 * @returns {NextResponse} - The JSON response object.
 */

/**
 * sendErrorResponse
 * @param {Object} params - The parameters for the error response.
 * @param {string} params.message - The error message.
 * @param {string} [params.error] - The error details (only in development mode).
 * @param {number} [params.status=500] - The HTTP status code (default is 500).
 *
 * @returns {NextResponse} - The JSON response object.
 */
