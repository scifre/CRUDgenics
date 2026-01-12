import { useState } from "react";

export default function MeetingRoomDetails({ roomNumber, empId }: { roomNumber: number, empId?: string }) {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [reservations, setReservations] = useState<Array<{reserved_from:string,reserved_to:string,reserved_by:string}>>([]);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
    const [showSlots, setShowSlots] = useState<boolean>(false);

    const findRoomSchedule = async (roomNumber: number, date: string) => {
        if (!date) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-room-details?room_id=${roomNumber}&date=${date}`);
        const data = await res.json();
        setReservations(data.details || []);
        setSelectedSlot(null); // clear selection when reloading
        setShowSlots(true);
    }
    
    // define slot start hours from 10 to 18 (10-11 ... 18-19) => 9 slots for a 3x3 grid
    const slotHours = [10,11,12,13,14,15,16,17,18];

    const isReserved = (startHour: number) => {
        for (const r of reservations) {
            const fromHour = parseInt((r.reserved_from || "").split(":")[0] || "0", 10);
            const toHour = parseInt((r.reserved_to || "").split(":")[0] || "0", 10);
            if (!isNaN(fromHour) && !isNaN(toHour)) {
                if (startHour >= fromHour && startHour < toHour) {
                    return r.reserved_by || "Reserved";
                }
            }
        }
        return null;
    }

    const formatLabel = (start: number) => {
        const end = start + 1;
        return `${String(start).padStart(2,"0")}:00 - ${String(end).padStart(2,"0")}:00`;
    }

    const reserveRoom = async () => {
        if (selectedSlot === null || !selectedDate || !empId) return;
        const payload = {
            room_id: roomNumber,
            emp_id: empId,
            date: selectedDate,
            start_time: `${String(selectedSlot).padStart(2,"0")}:00:00`,
            end_time: `${String(selectedSlot + 1).padStart(2,"0")}:00:00`
        };
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reserve-room`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                // refresh reservations
                await findRoomSchedule(roomNumber, selectedDate);
                setSelectedSlot(null);
            } else {
                console.error("Reserve failed:", data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return <>
        MeetingRoom no {roomNumber}
        <div className="">
            <div className="mt-4 flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center gap-6">
                    <div className="mb-2 text-lg font-medium text-gray-700">Select Date:</div>
                    <input type="date" className="border border-gray-300 p-2 rounded justify-end text-gray-700" 
                        onChange={(e) => { setSelectedDate(e.target.value); setShowSlots(false); }} />
                </div>
                <button className="ml-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                onClick={() => findRoomSchedule(roomNumber, selectedDate)}>Find Availability</button>
            </div> 

            {showSlots && (
                <>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        {slotHours.map((start, idx) => {
                            const reserver = isReserved(start);
                            const isSelected = selectedSlot === start;
                            const baseClasses = "p-4 rounded border flex flex-col justify-center items-center";
                            const reservedClasses = "bg-gray-200 text-gray-700 border-gray-300 cursor-not-allowed";
                            const availableClasses = isSelected
                                ? "bg-blue-600 text-white border-blue-700"
                                : "bg-green-50 text-green-800 border-green-200 hover:border-green-500 cursor-pointer";
                            return (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        if (!reserver) setSelectedSlot(prev => prev === start ? null : start);
                                    }}
                                    className={`${baseClasses} ${reserver ? reservedClasses : availableClasses}`}
                                >
                                    <div className="text-sm font-medium">{formatLabel(start)}</div>
                                    <div className="mt-2 text-base">
                                        {reserver ? reserver : (isSelected ? "Selected" : "Available")}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            disabled={selectedSlot === null || !selectedDate || !empId}
                            className={`px-4 py-2 rounded ${selectedSlot && selectedDate && empId ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
                            onClick={reserveRoom}
                        >
                            {selectedSlot ? `Reserve for ${formatLabel(selectedSlot)}` : "Reserve"}
                        </button>
                    </div>
                </>
            )}
        </div>
    </>
}