"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, PieChart, MessageSquare } from "lucide-react";

export default function DashboardContent() {
    return (
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
                    icon={<Calendar className="h-8 w-8 text-purple-500" />}
                />
                <DashboardCard
                    title="Total Revenue"
                    value="$15,240"
                    icon={<PieChart className="h-8 w-8 text-purple-500" />}
                />
                <DashboardCard
                    title="Unread Messages"
                    value="5"
                    icon={<MessageSquare className="h-8 w-8 text-purple-500" />}
                />
            </div>
        </div>
    );
}

interface DashboardCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

function DashboardCard({ title, value, icon }: DashboardCardProps) {
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
