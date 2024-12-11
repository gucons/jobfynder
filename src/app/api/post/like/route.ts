import prisma from "@/lib/prisma";
import handleRouteWithAuth from "@/server/handle-auth-route";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = handleRouteWithAuth(async (req, session) => {
  const rawData = await req.json();

  const data = z
    .object({
      postId: z.string(),
    })
    .parse(rawData);

  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId: data.postId,
        userId: session.user.id,
      },
    },
  });

  if (existingLike) {
    // Unlike
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    return NextResponse.json({ liked: false });
  }

  // Like
  await prisma.like.create({
    data: {
      postId: data.postId,
      userId: session.user.id,
    },
  });

  return NextResponse.json(
    {
      success: true,
      liked: true,
    },
    { status: 200 }
  );
});
