"use client";

import DashboardContent from "@/components/dashboard/dashboardCard";
import DashboardHeader from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import React, { useState } from "react";

export default function Dashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
            />
            <main className="flex-1 overflow-y-auto">
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <DashboardContent />
            </main>
        </div>
    );
}
