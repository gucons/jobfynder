import UserMenu from "@/components/header/userMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { Bell, MessageSquare, Search } from "lucide-react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import { Toaster } from "sonner";
import "./globals.css";

const logoFont = localFont({
    src: "./fonts/font.otf",
    variable: "--font-logo",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Jobfynder - Connect with Recruiters & Follow Jobs",
    description:
        "Jobfynder helps IT professionals and staffing agencies connect, post jobs, and access support services like training, resume building, and immigration paperwork.",
    keywords:
        "Jobfynder, IT jobs, recruitment, job board, staffing agencies, job search, job support, resume building, immigration support",
    authors: {
        name: "Jobfynder",
        url: "https://www.jobfynder.com",
    },

    // Open Graph / Facebook
    openGraph: {
        type: "website",
        url: "https://www.jobfynder.com",
        title: "Jobfynder - Niche Job Board for IT Professionals",
        description:
            "Find IT jobs, connect with recruiters, and access training and support services to get into your dream job.",
        images: "/images/jobfynder-og-image.jpg",
        siteName: "Jobfynder",
    },

    // Twitter Meta Tags
    twitter: {
        card: "summary_large_image",
        site: "@jobfynder",
        title: "Jobfynder - Connect with Recruiters & Follow Jobs",
        description:
            "A niche social network and job board connecting IT professionals and staffing agencies with training, resume support, and immigration services.",
        images: "/images/jobfynder-twitter-image.jpg",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="en">
            <body className="antialiased font-mono">
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
                                <MessageSquare className="h-5 w-5" />
                            </Button>

                            {
                                // TODO: Add middleware to ensure user object and user is authenticated
                                session?.user && (
                                    <UserMenu user={session?.user} />
                                )
                            }
                        </div>
                    </div>
                </header>
                {children}
                <Toaster position="top-center" />
            </body>
        </html>
    );
}
