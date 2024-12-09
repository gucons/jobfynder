import prisma from "@/lib/prisma";
import {
  sendSuccessResponse
} from "@/server/handle-route-response";
import handleRoute from "@/server/handleRoutes";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const POST = async (req: Request) => {
  handleRoute(async () => {
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
      message: "User created successfully",
    });
  });
};
