import { Post } from "@prisma/client";
import { z } from "zod";

const PostSchema = z.object({
  content: z.string().min(1).max(500),
  media: z.array(z.string()).optional(),
});

export type PostType = z.infer<typeof PostSchema>;

//Ensure the types of PostSchema match with the DB type
export const assertTypeMatch: PostType = {} as Post;

export default PostSchema;