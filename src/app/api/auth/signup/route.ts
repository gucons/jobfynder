import prisma from "@/lib/prisma";
import { sendErrorResponse, sendSuccessResponse } from "@/server/response";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const POST = async (req: Request) => {
  try {
    const requestData = await req.json();

    const data = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
      .parse(requestData);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashedPassword,
      },
    });

    return sendSuccessResponse({
      success: true,
      message: "User created successfully",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendErrorResponse({
        success: false,
        message: error.errors[0].message,
      });
    } else {
      console.log("Error during authentication:", error.message || error);
      return sendErrorResponse({
        success: false,
        message: "An error occurred during authentication.",
        error: error.message || error,
      });
    }
  }
};
