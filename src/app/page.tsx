import SignOutButton from "@/components/header/logoutButton";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (!session || !session?.user) {
    return (
      <div className="grid min-h-screen grid-cols-1 items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <h1 className="text-2xl font-bold">You are not logged in</h1>
        <p className="text-lg">Please login to view this page</p>
        <Button>
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>
    );
  } else
    return (
      <div className="grid min-h-screen grid-cols-1 items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        Welcome {session.user.name} and your email is {session.user.email}
        <Link href={"/feed"} className="rounded-r-md bg-gray-500 p-2">
          View Feed
        </Link>
        <SignOutButton />
      </div>
    );
}
