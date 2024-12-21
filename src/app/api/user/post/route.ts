import prisma from "@/lib/prisma";
import PostSchema from "@/schema/PostSchema";
import handleRouteWithAuth from "@/server/handleAPIRouteAuth";
import { NextResponse } from "next/server";

export const POST = handleRouteWithAuth(async (req, session) => {
  const requestData = await req.json();

  const data = PostSchema.parse(requestData);
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
      status: 200,
    }
  );
});
