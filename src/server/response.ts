import { NextResponse } from "next/server";

type error = {
    success: boolean,
    message: string,
    error?: any
}

type success = {
    success: boolean,
    message: string,
    status?: number,
    data?: any
}

export function sendErrorResponse(params: error) {
    return NextResponse.json(
        {
            success: params.success,
            message: params.message,
            description: params.error.message || "Internal server error",
        },
        {
            status: 500
        }
    )
}

export function sendSuccessResponse(params: success) {
    return NextResponse.json(
        {
            success: params.success,
            message: params.message,
            data: params.data
        },
        {
            status: params.status || 200
        }
    )
}