import { auth } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    // Handle consultant certifications
    consultantCertifications: f({ pdf: { maxFileCount: 5, maxFileSize: "2MB" } })
        .middleware(async ({ req }) => {
            // Verify the user is authenticated
            const session = await auth();

            // If the user is not authenticated, throw an error
            if (!session) throw new UploadThingError("Unauthorized");

            // Return metadata to be used in onUploadComplete
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback, be careful with sensitive data
            return { uploadedBy: metadata.userId as string };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
