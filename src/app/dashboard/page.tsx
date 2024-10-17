'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    BarChart,
    Bell,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Home,
    Menu,
    MessageSquare,
    PieChart,
    Settings,
    Users,
} from "lucide-react";

export default function Dashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`bg-white text-gray-800 ${
                    isSidebarCollapsed ? "w-16" : "w-64"
                } transition-all duration-300 ease-in-out`}
            >
                <div className="flex items-center justify-between p-4">
                    {!isSidebarCollapsed && (
                        <h2 className="text-xl font-bold text-purple-600">
                            Timii
                        </h2>
                    )}
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        {isSidebarCollapsed ? (
                            <ChevronRight />
                        ) : (
                            <ChevronLeft />
                        )}
                    </Button>
                </div>
                <nav className="mt-8">
                    <SidebarItem
                        icon={<Home />}
                        label="Dashboard"
                        isCollapsed={isSidebarCollapsed}
                    />
                    <SidebarItem
                        icon={<Calendar />}
                        label="Schedule"
                        isCollapsed={isSidebarCollapsed}
                    />
                    <SidebarItem
                        icon={<Users />}
                        label="Clients"
                        isCollapsed={isSidebarCollapsed}
                    />
                    <SidebarItem
                        icon={<MessageSquare />}
                        label="Messages"
                        isCollapsed={isSidebarCollapsed}
                    />
                    <SidebarItem
                        icon={<BarChart />}
                        label="Analytics"
                        isCollapsed={isSidebarCollapsed}
                    />
                    <SidebarItem
                        icon={<Settings />}
                        label="Settings"
                        isCollapsed={isSidebarCollapsed}
                    />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-8 py-4">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mr-4 lg:hidden"
                                onClick={toggleSidebar}
                            >
                                <Menu />
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
                                <Bell />
                            </Button>
                            <Avatar>
                                <AvatarImage
                                    src="/placeholder-user.jpg"
                                    alt="User"
                                />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <DashboardCard
                            title="Total Clients"
                            value="128"
                            icon={<Users className="h-8 w-8 text-purple-500" />}
                        />
                        <DashboardCard
                            title="Upcoming Sessions"
                            value="12"
                            icon={
                                <Calendar className="h-8 w-8 text-purple-500" />
                            }
                        />
                        <DashboardCard
                            title="Total Revenue"
                            value="$15,240"
                            icon={
                                <PieChart className="h-8 w-8 text-purple-500" />
                            }
                        />
                        <DashboardCard
                            title="Unread Messages"
                            value="5"
                            icon={
                                <MessageSquare className="h-8 w-8 text-purple-500" />
                            }
                        />
                    </div>

                    {/* Additional dashboard content can be added here */}
                </div>
            </main>
        </div>
    );
}

function SidebarItem({ icon, label, isCollapsed }) {
    return (
        <Button
            variant="ghost"
            className={`w-full justify-start mb-2 ${
                isCollapsed ? "px-2" : "px-4"
            }`}
        >
            {icon}
            {!isCollapsed && <span className="ml-4">{label}</span>}
        </Button>
    );
}

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
