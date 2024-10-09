"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import showToastError from "@/lib/toastError";
import Link from "next/link";

export default function Home() {
    const [user, setUser] = useState<Record<string, any>>({});

    useEffect(() => {
        api.get<{
            success: boolean;
            user: {
                email: string;
            };
        }>("/auth/me")
            .then((response) => {
                console.log(response.data);
                setUser(response.data.user);
            })
            .catch(showToastError);
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {user ? (
                <div>
                    <h1 className="text-2xl font-bold">User Information</h1>
                    <p className="text-lg">Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}

            {user ? (
                <div
                    onClick={() => {
                        api.post("/auth/logout")
                            .then(() => {
                                setUser({});
                            })
                            .catch(showToastError);
                    }}
                    className="cursor-pointer text-blue-500 bg-red-600 p-4"
                >
                    Logout
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <Link href={"/login"}>Login</Link>
                    <Link href={"/register"}>Register</Link>
                </div>
            )}
        </div>
    );
}
