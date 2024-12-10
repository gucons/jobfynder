"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useUploadFile } from "@/hooks/use-upload-file";
import { getErrorMessage } from "@/lib/handle-error";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FileUploader } from "../base/file-upload/file-uploader";
import ButtonLoading from "../form/loading-button";
import { AutosizeTextarea } from "../ui/auto-resize-testarea";

const PostSchema = z.object({
  content: z
    .string({ message: "Content is required" })
    .min(20, {
      message: "Content must be at least 20 characters",
    })
    .max(500, { message: "Content must be at most 500 characters" }),
  media: z.array(z.instanceof(File)),
});

export default function CreatePost({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);

  const { onUpload, progresses, isUploading } = useUploadFile("postMedia", {});

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      media: [],
    },
  });

  const createPost = async ({
    content,
    media,
  }: {
    content: string;
    media: string[];
  }) => {
    await axios.post("/api/user/post", { content, media });
  };

  async function onSubmit(values: z.infer<typeof PostSchema>) {
    setLoading(true);

    try {
      const fileKeys =
        values.media.length > 0 ? await onUpload(values.media) : [];

      if (values.media.length > 0 && fileKeys.length > 0) {
        toast.success("Media uploaded successfully");
      }

      toast.promise(
        async () => {
          form.reset();
          await createPost({
            content: values.content,
            media: fileKeys,
          });
        },
        {
          loading: "Creating post...",
          success: () => {
            return "Post created successfully";
          },
          error: (err) => getErrorMessage(err),
        }
      );
    } catch (err) {
      console.error("An error occurred", err);
      toast.error("An error occurred", {
        description: getErrorMessage(err),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-4 p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
          >
            <div className="flex items-start gap-3">
              <Avatar className="size-10">
                <AvatarImage src={session.user.image} alt="User" />
                <AvatarFallback>{session.user.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AutosizeTextarea
                          {...field}
                          minHeight={60}
                          placeholder="What's on your mind?"
                          className="resize-none text-base leading-relaxed"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="media"
                  render={({ field }) => (
                    <div>
                      <FormItem className="w-full">
                        <FormControl>
                          <FileUploader
                            value={field.value}
                            onValueChange={field.onChange}
                            maxFileCount={6}
                            maxSize={4 * 1024 * 1024}
                            progresses={progresses}
                            disabled={isUploading}
                            className="h-28"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      {/* {uploadedFiles.length > 0 ? (
                        <UploadedFilesCard uploadedFiles={uploadedFiles} />
                      ) : null} */}
                    </div>
                  )}
                />
                <ButtonLoading
                  type="submit"
                  loading={loading}
                  loaderText="Creating post"
                  staticText="Create post"
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
