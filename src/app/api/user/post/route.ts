import prisma from "@/lib/prisma";
import PostSchema from "@/schema/PostSchema";
import { authenticateUser } from "@/server/authenticateUser";
import handleRoute from "@/server/handleRoutes";
import { NextResponse } from "next/server";

export const POST = handleRoute(async (req: Request) => {
  const session = await authenticateUser();

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "User not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const requestData = await req.json();
  console.log("Request Data:", requestData);
  const data = PostSchema.parse(requestData);

  console.log("Data", data.content, data.media, session.user.id);

  await prisma.post.create({
    data: {
      content: data.content,
      media: data.media,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "Post created successfully",
    },
    {
      status: 201,
    }
  );
});
