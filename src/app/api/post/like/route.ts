import prisma from "@/lib/prisma";
import { authenticateUser } from "@/server/authenticateUser";
import handleRoute from "@/server/handleRoutes";
import { NextResponse } from "next/server";

export const POST = handleRoute(async (req: Request) => {
  const session = await authenticateUser();
  const { postId } = await req.json();

  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
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
      postId,
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
