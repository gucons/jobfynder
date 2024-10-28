import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
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

    const clientSession = {
        expires: session?.expires || "",
        user: {
            email: session?.user?.email,
            image: session?.user?.image,
            name: session?.user?.name,
        },
    };

    return (
        <html lang="en">
            <body className="font-mono antialiased">
                <SessionProvider session={clientSession}>
                    {children}
                </SessionProvider>
                <Toaster position="top-center" />
            </body>
        </html>
    );
}
