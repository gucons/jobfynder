"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Menu } from "lucide-react";

interface DashboardHeaderProps {
    toggleSidebar: () => void;
}

export default function DashboardHeader({
    toggleSidebar,
}: DashboardHeaderProps) {
    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-4"
                        onClick={toggleSidebar}
                    >
                        <Menu className="size-5" />
                    </Button>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Dashboard
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-64"
                    />
                    <Button variant="ghost" size="icon">
                        <Bell className="size-5" />
                    </Button>
                    <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
