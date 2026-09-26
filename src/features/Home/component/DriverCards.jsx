import { useState } from "react";

export default function DriverRow({ data }) {

    console.log("lele ", data)
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            onClick={() => setExpanded(!expanded)}
            className="w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300"
        >
            {/* ================= COLLAPSED ROW ================= */}
            <div className="h-[50px] min-w-[900px] flex items-center gap-6 px-4">

                {/* Driver */}
                <div className="min-w-[150px]">
                    <p className="text-sm font-bold text-gray-800">
                        {data.driverName}
                    </p>
                </div>

                {/* Trips */}
                <div className="text-sm whitespace-nowrap">
                    <span className="text-gray-500">Trips:</span>{" "}
                    <span className="font-semibold">{data.TotalRps}</span>
                </div>

                {/* Salary */}
                <div className="text-sm whitespace-nowrap">
                    <span className="text-gray-500">Salary:</span>{" "}
                    <span className="font-semibold text-green-600">
                        ₹{data.TotalSalary.toLocaleString("en-IN")}
                    </span>
                </div>

                {/* Timing */}
                <div className="flex items-center gap-3 text-sm whitespace-nowrap">
                    <span className="font-semibold text-green-600">
                        🟢 {data.Early}
                    </span>

                    <span className="font-semibold text-blue-600">
                        🔵 {data.OnTime}
                    </span>

                    <span className="font-semibold text-red-600">
                        🔴 {data.Late}
                    </span>
                </div>

                {/* Route Preview */}
                <div className="flex-1 truncate text-sm text-gray-500">
                    {data.Route.join(" → ")}
                </div>

                {/* Vehicle Preview */}
                <div className="whitespace-nowrap text-sm font-semibold text-purple-600">
                    🚛 {data.Vehicles[0]}
                </div>

                {/* Arrow */}
                <div
                    className={`text-gray-400 transition-transform duration-300 ${expanded ? "rotate-180" : ""
                        }`}
                >
                    ▼
                </div>
            </div>

            {/* ================= EXPANDED SECTION ================= */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${expanded
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                            {/* Timing Details */}
                            <div className="rounded-lg bg-white p-4 border border-gray-100">
                                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                                    Timing Details
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Early</span>
                                        <span className="font-semibold text-green-600">
                                            {data.Early}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">On Time</span>
                                        <span className="font-semibold text-blue-600">
                                            {data.OnTime}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Late</span>
                                        <span className="font-semibold text-red-600">
                                            {data.Late}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Routes */}
                            <div className="rounded-lg bg-white p-4 border border-gray-100">
                                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                                    Routes
                                </h3>

                                <div className="space-y-2">
                                    {data.Route.map((route, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-700"
                                        >
                                            <span className="text-blue-500">📍</span>
                                            {route}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Vehicles */}
                            <div className="rounded-lg bg-white p-4 border border-gray-100">
                                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                                    Vehicles
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {data.Vehicles.map((vehicle, index) => (
                                        <span
                                            key={index}
                                            className="rounded-md bg-purple-100 px-3 py-2 text-sm font-semibold text-purple-700"
                                        >
                                            🚛 {vehicle}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Bottom Summary */}
                        <div className="mt-4 flex flex-wrap items-center gap-6 rounded-lg bg-white px-4 py-3 border border-gray-100">
                            <div>
                                <span className="text-xs text-gray-400">Total Trips</span>
                                <p className="font-bold text-gray-800">
                                    {data.TotalRps}
                                </p>
                            </div>

                            <div>
                                <span className="text-xs text-gray-400">Total Salary</span>
                                <p className="font-bold text-green-600">
                                    ₹{data.TotalSalary?.toLocaleString("en-IN")}
                                </p>
                            </div>

                            <div>
                                <span className="text-xs text-gray-400">Total Routes</span>
                                <p className="font-bold text-gray-800">
                                    {data.Route.length}
                                </p>
                            </div>

                            <div>
                                <span className="text-xs text-gray-400">Total Vehicles</span>
                                <p className="font-bold text-gray-800">
                                    {data.Vehicles.length}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
