import CreatePost from "@/components/feed/createPost";
import PostCard from "@/components/feed/postCard";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { auth } from "@/server/auth";
import { Session } from "next-auth";
import { Suspense } from "react";

type Props = {};

async function page({}: Props) {
  const session = (await auth()) as Session;

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      // visibility: "PUBLIC",
      // published: true,
    },
    select: {
      id: true,
      updatedAt: true,
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
        },
      },
      media: true,
      content: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    take: 10,
  });

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-2">
        <Suspense>
          <CreatePost session={session} />
        </Suspense>
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">
            Recent Posts
          </span>
          <Separator className="flex-1" />
        </div>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <PostCard
              key={index}
              author={post.author}
              content={post.content}
              media={post.media}
              likeCount={post._count.likes}
              isLiked={post.likes.length > 0}
              postId={post.id}
              updatedAt={post.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
