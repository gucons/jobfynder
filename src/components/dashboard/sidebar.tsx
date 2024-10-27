"use client";

import JobfynderLogo from "@/components/jobfynderLogo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    BarChart,
    Bell,
    Bookmark,
    Calendar,
    FileText,
    Home,
    LucideIcon,
    MessageSquare,
    Search,
    Settings,
    UserCheck,
    Users,
} from "lucide-react";
import Image from "next/image";
import { createElement } from "react";

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    return (
        <motion.aside
            layout
            className="sticky top-0 h-screen shrink-0 border-r bg-white px-4 py-3"
            style={{
                width: !isCollapsed ? "250px" : "fit-content",
            }}
        >
            <TitleSection isCollapsed={isCollapsed} />

            <div className="space-y-1">
                {sidebarItems.map((item) => (
                    <SidebarItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        isCollapsed={isCollapsed}
                        selected="Dashboard"
                        notifs={item.label === "Messages" ? 5 : undefined}
                        setSelected={() => {}}
                    />
                ))}
            </div>
        </motion.aside>
    );
};

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
    selected: string;
    setSelected: (title: string) => void;
    notifs?: number; // Optional notifications count
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    label,
    isCollapsed,
    selected,
    setSelected,
    notifs,
}) => {
    return (
        <motion.div
            layout
            onClick={() => setSelected(label)}
            // className={`relative flex h-10 w-full items-center rounded-md`}
        >
            <Button
                variant={"ghost"}
                className={`flex h-full w-full items-center justify-start py-3 ${
                    isCollapsed ? "px-1" : "px-3"
                }`}
            >
                <motion.div
                    layout
                    className="grid h-full w-10 place-content-center"
                >
                    {createElement(icon, { className: "size-5" })}
                </motion.div>
                {!isCollapsed && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                    >
                        {label}
                    </motion.span>
                )}

                <div className="flex-grow"></div>
                {notifs && !isCollapsed && (
                    <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{ delay: 0.5 }}
                        className="rounded-full bg-indigo-500 px-1.5 text-xs text-white"
                    >
                        {notifs}
                    </motion.span>
                )}
            </Button>
        </motion.div>
    );
};

interface TitleSectionProps {
    isCollapsed: boolean;
}

const TitleSection: React.FC<TitleSectionProps> = ({ isCollapsed }) => {
    return (
        <div className="mb-3 border-b pb-3">
            <div className="flex items-center justify-center rounded-md">
                {isCollapsed ? (
                    <Image
                        width={100}
                        height={100}
                        className="size-8"
                        src={"/jobfynder-icon.svg"}
                        alt="Jobfynder Logo"
                    />
                ) : (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                    >
                        <div className="flex items-center gap-2 text-xl font-bold">
                            <Image
                                width={100}
                                height={100}
                                className="size-8"
                                src={"/jobfynder-icon.svg"}
                                alt="Jobfynder Logo"
                            />
                            <JobfynderLogo />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// Define sidebar items as an array for cleaner reuse
const sidebarItems = [
    { icon: Home, label: "Home" }, // General Home link
    { icon: Search, label: "Job Search" }, // For searching available jobs
    { icon: Bookmark, label: "Saved Jobs" }, // To access bookmarked job listings
    { icon: UserCheck, label: "My Applications" }, // Track submitted applications
    { icon: Calendar, label: "Interview Reminders" }, // Set reminders for interviews
    { icon: FileText, label: "Resume & Documents" }, // Upload and manage resumes and cover letters
    // { icon: Training, label: "Training & Resources" }, // Access training materials and resources
    { icon: MessageSquare, label: "Messages" }, // Communication with recruiters
    { icon: Bell, label: "Notifications" }, // Alerts for job updates and messages
    { icon: Settings, label: "Preferences" }, // Manage account settings and preferences
];

export default Sidebar;
