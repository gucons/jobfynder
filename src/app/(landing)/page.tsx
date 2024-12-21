import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid h-svh w-svw items-center justify-center">
      <div>
        <Button asChild variant={"default"} size={"lg"}>
          <Link href={"/feed"}>View Feed</Link>
        </Button>
      </div>
    </div>
  );
}
