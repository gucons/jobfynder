import UserMenu from "@/components/header/userMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { Bell, MessageSquare, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: Add middleware to ensure user object and user is authenticated
    const session = await auth();
    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Image
                            src={"/logo.png"}
                            alt="Jobfynder"
                            width={40}
                            height={40}
                            className="rounded-md"
                        />
                        <div className="relative items-center flex">
                            <Search className="size-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search jobs, skills, companies"
                                className="pl-10 w-64"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MessageSquare className="size-4" />
                        </Button>
                        {session?.user && <UserMenu user={session?.user} />}
                    </div>
                </div>
            </header>
            <main>{children}</main>
            <footer>{/* Add your footer content here */}</footer>
        </div>
    );
}
