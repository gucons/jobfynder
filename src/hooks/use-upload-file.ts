import { getErrorMessage } from "@/lib/handle-error";
import { uploadFiles } from "@/lib/uploadThing";
import { OurFileRouter } from "@/server/uploadThing";
import * as React from "react";
import { toast } from "sonner";
import type { AnyFileRoute, UploadFilesOptions } from "uploadthing/types";

interface UseUploadFileOptions<TFileRoute extends AnyFileRoute>
  extends Pick<
    UploadFilesOptions<TFileRoute>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {}

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  props: UseUploadFileOptions<OurFileRouter[keyof OurFileRouter]> = {}
) {
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function onUpload(files: File[]) {
    if (files.length === 0) return [];

    setIsUploading(true);
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        },
      });

      return res.map((file) => file.key);
    } catch (err) {
      toast.error(getErrorMessage(err));
      return [];
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    onUpload,
    progresses,
    isUploading,
  };
}
