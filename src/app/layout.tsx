import { ThemeProvider } from "@/components/theme/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
    // images: "/images/jobfynder-og-image.jpg",
    siteName: "Jobfynder",
  },

  // Twitter Meta Tags
  twitter: {
    card: "summary_large_image",
    site: "@jobfynder",
    title: "Jobfynder - Connect with Recruiters & Follow Jobs",
    description:
      "A niche social network and job board connecting IT professionals and staffing agencies with training, resume support, and immigration services.",
    // images: "/images/jobfynder-twitter-image.jpg",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
