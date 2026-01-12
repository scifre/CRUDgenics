"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Body(){
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const router = useRouter();
    const rooms = Array.from({ length: 6 }, (_, i) => `Meeting Room ${i + 1}`)
    return (
        <>
            <div className="bg-white flex gap-4 min-h-screen p-6 minw-screen">
                <div className="grid grid-cols-3 gap-6 h-full flex-1">
                    {rooms.map((name, idx) => (
                        <button
                            key={idx}
                            aria-label={name}
                            className="flex items-center justify-center h-32 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow bg-gray-50 text-black"
                            onClick={() => router.push(`/room/${idx + 1}`)}
                        >
                            <span className="text-lg font-medium">{name}</span>
                        </button>
                    ))}
                </div>
                <div className="bg-white basis-2/5 p-6 rounded-lg shadow-md flex flex-col border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Meeting Room Details</h2>
                    {selectedRoom == null ?(
                    <div className="text-gray-600 flex-1 flex items-center justify-center">
                        <p className="text-center">
                            Select a meeting room to view details.
                        </p>
                    </div>
                    ):<div></div>}
                </div>
            </div>
        </>
    )
}
