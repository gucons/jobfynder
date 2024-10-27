import { ZodError } from 'zod';
import { sendErrorResponse } from './response';

export function handleZodErrorResponse(error: ZodError) {
    return sendErrorResponse({
        success: false,
        message: "Invalid request data",
        error: error.errors,
    });
}