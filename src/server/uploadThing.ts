import { auth } from "@/lib/auth";
// import { ratelimit } from "@/lib/rate-limit";
import { generateReactHelpers } from "@uploadthing/react";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// !!! Whatever is returned in onUploadComplete is sent to the clientside `onClientUploadComplete` callback, be careful with sensitive data

export const ourFileRouter = {
  consultantCertifications: f({ pdf: { maxFileCount: 5, maxFileSize: "2MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();
      if (!session) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId as string };
    }),

  resume: f({
    pdf: { maxFileCount: 1, maxFileSize: "2MB" },
  })
    .middleware(async ({ req }) => {
      const session = await auth();
      if (!session) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId as string };
    }),

  postMedia: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async ({ req }) => {
      // Rate limit the upload
      // const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
      // const { success } = await ratelimit.limit(ip);
      // if (!success) {
      //   throw new UploadThingError("Rate limit exceeded");
      // }
      const session = await auth();
      if (!session) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;