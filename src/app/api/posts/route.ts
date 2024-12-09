import prisma from "@/lib/prisma";
import handleRoute from "@/server/handleRoutes";
import { NextResponse } from "next/server";

export default function GET(req: Request) {
  handleRoute(async (req) => {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "asc",
      },
      take: 10,
    });

    return NextResponse.json({ posts: posts });
  });
}
