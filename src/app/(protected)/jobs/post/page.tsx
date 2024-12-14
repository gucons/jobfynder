import { PostJobForm } from "@/components/jobs/PostJobForm";
import { auth } from "@/server/auth";
import { Session } from "next-auth";

export default async function PostJobPage() {
  // const session = (await auth()) as Session;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <PostJobForm  />
    </div>
  );
}
