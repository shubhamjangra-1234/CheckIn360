"use client";
import { useEffect, useState } from "react";

interface AttendanceRecord {
    _id: string;
    date: string;
    checkIn?: string;
    checkOut?: string;
    status?: string;
}

export default function Records() {
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await fetch("/api/users/records", {
                    method: "GET",
                    credentials: "include", // ensure cookies (token) are sent
                    headers: { "Content-Type": "application/json" },
                });

                const data = await res.json();
                setRecords(data.records || []);
            } catch (error) {
                console.error("Error fetching attendance records:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    return (
        <div className="my-4 max-w-3xl mx-auto">
            <h1 className="text-2xl text-zinc-900 font-bold mb-6 text-center"> Attendance Records</h1>
            <p className="text-center tex-sm text-gray-700">Here Your all attendance records will be displayed.</p>
            {loading ? (
                <p className="text-center text-zinc-800">Loading records...</p>
            ) : records.length === 0 ? (
                <p className="text-center text-gray-700">No records found.</p>
            ) : (
                <div className="mt-6 p-2 shadow-lg rounded-md bg-white ">
                    <h1 className="text-sm m-2 text-zinc-800 ">All Attendance Records till now </h1>
                <div className="overflow-x-auto rounded-md  ">
                    <table className="min-w-full  ">
                        <thead className="bg-blue-600  ">
                            <tr>
                                <th className=" px-4 py-2  text-left">Date</th>
                                <th className=" px-4 py-2 text-xs text-left">Check-In</th>
                                <th className=" px-4 py-2 text-xs text-left">Check-Out</th>
                                <th className=" px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr
                                    key={record._id}
                                    className=" even:bg-gray  hover:bg-gray-50"
                                >
                                    <td className=" text-xs md:text-md lg:text-md text-zinc-700 px-4 py-2">
                                        {record.date}
                                    </td>
                                    <td className=" text-xs md:text-md lg:text-md text-zinc-700 px-4 py-2">
                                        {record.checkIn || "-"}
                                    </td>
                                    <td className=" text-xs md:text-md lg:text-md text-zinc-700 px-4 py-2">
                                        {record.checkOut || "-"}
                                    </td>
                                    <td className=" text-sm md:text-md lg:text-md text-green-700 px-4 py-2">
                                        {record.status || "Pending"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                </div>
            )}
        </div>
    );
}
