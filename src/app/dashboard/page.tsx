"use client";

import React from "react";
import {
  Bell,
  BookOpen,
  Briefcase,
  ChevronDown,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

// type UserRole = "consultant" | "recruiter" | "benchSales";

interface DashboardProps {
  user: {
    name: string;
    role: UserRole;
    avatar: string;
  };
}

export default function CentralDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const session = useSession();
  const user = session.data?.user;

  const getQuickStats = (role: UserRole) => {
    switch (role) {
      case "CONSULTANT":
        return [
          { label: "Connections", value: 150 },
          { label: "Applications", value: 12 },
          { label: "Profile Views", value: 45 },
        ];
      case "RECRUITER":
        return [
          { label: "Job Postings", value: 25 },
          { label: "Applicants", value: 187 },
          { label: "Profiles Viewed", value: 93 },
        ];
      case "BENCH_SALES":
        return [
          { label: "Consultants Managed", value: 32 },
          { label: "Jobs Matched", value: 18 },
          { label: "Hotlist Status", value: "Updated" },
        ];
    }
  };

  const getRoleSpecificContent = (role: UserRole) => {
    switch (role) {
      case "CONSULTANT":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recommended Jobs</CardTitle>
              <CardDescription>
                Based on your skills and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Senior React Developer at TechCorp</li>
                <li>Full Stack Engineer at InnoSoft</li>
                <li>Frontend Specialist at WebWizards</li>
              </ul>
            </CardContent>
          </Card>
        );
      case "RECRUITER":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Matching Candidates</CardTitle>
              <CardDescription>For your recent job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>John Doe - 95% match for Senior Developer</li>
                <li>Jane Smith - 88% match for Project Manager</li>
                <li>Mike Johnson - 82% match for UX Designer</li>
              </ul>
            </CardContent>
          </Card>
        );
      case "BENCH_SALES":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Consultant Insights</CardTitle>
              <CardDescription>
                Status of your managed consultants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>5 consultants available for new projects</li>
                <li>3 consultants nearing project completion</li>
                <li>2 consultants require skill updates</li>
              </ul>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold">Jobfynder</h1>
        </div>
        <nav className="space-y-2 p-4">
          <Button variant="ghost" className="w-full justify-start">
            <Briefcase className="mr-2 h-4 w-4" />
            Job Listings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Networking
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            Training & Resources
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <span className="sr-only">Open menu</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Navigate through Jobfynder
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="mt-4 flex flex-col space-y-4">
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Job Listings
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Networking
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Training & Resources
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-bold text-purple-600 lg:hidden">
                Jobfynder
              </h1>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pr-8 sm:w-64"
                />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <Button variant="ghost" size="icon" className="ml-2">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" className="ml-2">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>User Profile</SheetTitle>
                    <SheetDescription>Manage your account</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-sm capitalize text-muted-foreground">
                          {user.role}
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <nav className="flex flex-col space-y-2">
                      <Button variant="ghost" className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Account Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </Button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <ScrollArea className="h-full">
          <main className="flex-1 overflow-y-auto p-4">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Welcome message and quick stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back, {user.name}!</CardTitle>
                  <CardDescription>
                    Here's an overview of your activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {user &&
                      user.role &&
                      getQuickStats(user.role)?.map((stat, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-4">
                          <h3 className="text-sm font-medium text-gray-500">
                            {stat.label}
                          </h3>
                          <p className="mt-1 text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Feed</CardTitle>
                  <CardDescription>
                    Recent updates and interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" alt="User" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            New job posting: Senior React Developer
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Posted by TechCorp • 2 hours ago
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage
                            src="/placeholder-user-2.jpg"
                            alt="User"
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            Jane Doe viewed your profile
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Recruiter at InnoSoft • 1 day ago
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage
                            src="/placeholder-company.jpg"
                            alt="Company"
                          />
                          <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            New industry article: "The Future of Remote Work"
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Published by TechInsights • 3 days ago
                          </p>
                        </div>
                      </li>
                    </ul>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Role-specific information */}
              {getRoleSpecificContent(user.role)}
            </div>
          </main>
        </ScrollArea>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="mb-4 flex space-x-4 sm:mb-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                About Us
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Contact
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Privacy Policy
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22  12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
