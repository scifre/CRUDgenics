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
            router.push(`/home/${username.toUpperCase()}`);
        }
    }
    return (
        <>
        <div className="w-full h-screen flex justify-center items-center bg-gray-100 gap-4 md:flex flex-col">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="username">Username</label>
                        <input className="w-full border border-gray-300 p-2 rounded text-black" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="password">Password</label>
                        <input className="w-full border border-gray-300 p-2 rounded text-black" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit" onClick={handleLogin}>Login</button>
                </form>
            </div>
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Test Credentials</h2>
                <div className="text-sm text-gray-700 space-y-2">
                    <p><span className="font-medium">Username:</span> Employee Code</p>
                    <p><span className="font-medium">Password:</span> First letter of your name</p>
                    <p className="text-gray-500">Example: Employee Code <span className="font-medium">12345</span>, name <span className="font-medium">Alice</span> → password <span className="font-medium">a</span></p>
                </div>
            </div>
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">App Details</h2>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Frontend: Next.js</li>
                    <li>Backend: FastAPI</li>
                    <li>Database: PostgreSQL</li>
                    <li>Frontend, Backend, and Database are deployed as separate containers</li>
                    <li>The app is hosted on AWS EC2 and containers are managed by Docker Compose</li>
                </ul>
            </div>
        </div>
        </>
    )
}
