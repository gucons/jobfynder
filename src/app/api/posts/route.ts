import prisma from "@/lib/prisma";
import handleRoute from "@/server/handleRoutes";
import { NextResponse } from "next/server";

export const GET = handleRoute(async (req: Request) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "asc",
    },
    take: 10,
  });

  return NextResponse.json({ posts: posts });
});
