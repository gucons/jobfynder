"use client";

import { UploadedFilesCard } from "@/components/base/file-upload/uploaded-files-card";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FileUploader } from "../base/file-upload/file-uploader";
import ButtonLoading from "../form/buttonLoading";
import { AutosizeTextarea } from "../ui/auto-resize-testarea";

const PostSchema = z.object({
  content: z.string({ message: "Content is required" }).min(0, {
    message: "Content must be at least 20 characters",
  }),
  media: z.array(z.instanceof(File)),
});

export default function CreatePost() {
  const [loading, setLoading] = useState(false);

  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "postMedia",
    { defaultUploadedFiles: [] }
  );

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      media: [],
    },
  });

  function onSubmit(values: z.infer<typeof PostSchema>) {
    setLoading(true);

    toast.promise(onUpload(values.media), {
      loading: "Uploading images...",
      success: () => {
        form.reset();
        setLoading(false);
        return "Images uploaded";
      },
      error: (err) => {
        setLoading(false);
        form.reset();
        return getErrorMessage(err);
      },
    });
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
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
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
                            maxFileCount={4}
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
