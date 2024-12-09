import { signOut } from "@/server/auth";
import { LogOut } from "lucide-react";

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirect: true, redirectTo: "/login" });
      }}
    >
      <button type="submit" className="flex items-center gap-2">
        <LogOut className="size-4" />
        Sign Out
      </button>
    </form>
  );
}

SignOutButton.displayName = "SignOutButton";

export default SignOutButton;
