"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "emp_id": username, "password": password }),
        });

        if (res.ok) {
            router.push(`/home/${username}`);
        }
    }
    return (
        <>
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
                        <input className="w-full border border-gray-300 p-2 rounded" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input className="w-full border border-gray-300 p-2 rounded" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
        </>
    )
}
