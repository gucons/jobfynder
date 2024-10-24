import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/lib/auth";

export default async function Home() {
    const session = await auth();

    if (!session?.user || !session) {
        return (
            <div>
                <h1 className="text-2xl font-bold">You are not logged in</h1>
                <p className="text-lg">Please login to view this page</p>
                <Button
                    onClick={async () => {
                        "use server";
                        signIn();
                    }}
                >
                    Login
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            Welcome {session.user.name} and your email is {session.user.email}
            <Button
                onClick={async () => {
                    "use server";
                    signOut();
                }}
            >
                Logout
            </Button>
        </div>
    );
}
