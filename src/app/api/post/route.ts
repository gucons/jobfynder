import prisma from "@/lib/prisma";
import handleRouteWithAuth from "@/server/handleAPIRouteAuth";
import { NextResponse } from "next/server";

export const GET = handleRouteWithAuth(async (req, session) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    include: {
      likes: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  const postsWithLikeStatus = posts.map((post) => ({
    ...post,
    isLiked: post.likes.some((like) => like.userId === session.user.id),
    likes: post._count.likes,
    author: post.author,
  }));

  return NextResponse.json({ posts: postsWithLikeStatus });
});
