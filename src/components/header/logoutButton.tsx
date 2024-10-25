import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";

function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut({ redirect: true, redirectTo: "/login" });
            }}
        >
            <button type="submit" className="flex gap-2 items-center">
                <LogOut className="size-4" />
                Sign Out
            </button>
        </form>
    );
}

SignOutButton.displayName = "SignOutButton";

export default SignOutButton;
