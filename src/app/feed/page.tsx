import CreatePost from "@/components/feed/createPost";
import PostCard from "@/components/feed/postCard";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";

type Props = {};

async function page({}: Props) {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      // visibility: "PUBLIC",
      // published: true,
    },
    select: {
      updatedAt: true,
      likes: true,
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
        <CreatePost />
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">
            Recent Posts
          </span>
          <Separator className="flex-1" />
        </div>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
