
import { useState } from "react";

export default function TripCard({ data }) {
    const [showPayroll, setShowPayroll] = useState(false);


    // const data = {
    //     date: "2026-08-27",
    //     rps: "8204727",
    //     driverName: "6232531705",
    //     vehicleNumber: "MP09DJ5081",
    //     route: "Indore-Mandsore-Neemch",
    //     dispatchTime: "2026-08-27T03:02",
    //     inTime: "2026-08-27T11:35",
    //     givenHour: "08",
    //     givenMinutes: "30",
    //     touchingPoint: "Mandsore",
    //     unloadTime: "2026-08-27T08:50",
    //     loadTime: "2026-08-27T10:08",
    //     loadhour: "01",
    //     loadminute: "30",
    //     loadStatus: "Early",
    //     loadedTimeTaken: "1h :18m",
    //     loadedTimeDifference: "0h :12m",
    //     payroll: {
    //         incentive: 0,
    //         penalty: 150,
    //         tripStatus: "Late",
    //         tripTimeTaken: "8h : 33m",
    //         tripTimeDifference: "0h : 3m",
    //         tripSalary: 700,
    //         TotalSalary: 550,
    //     },
    // };

    const formatDateTime = (value) => {
        const date = new Date(value);
        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const [DelayHour, DelayMinute] = data.payroll.tripTimeDifference.split(":");
    const number = parseInt(DelayHour.match(/\d+/)[0]);



    const DelayByhour = number !== 0;



    return (
        <div className="w-full  overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                            Trip Date
                        </p>
                        <h2 className="mt-1 text-lg font-bold text-gray-900">
                            {data.date}
                        </h2>
                    </div>

                    <div>
                        {
                            data.payroll.tripStatus === "Late" ?
                                <p className="text-red-500 font-bold text-center">


                                    {
                                        DelayByhour ? `Delay By ${data.payroll.tripTimeDifference}` :
                                            `Delay By ${DelayMinute}`
                                    }

                                </p> : data.payroll.tripStatus === "Early" ?
                                    <p className="text-green-500 font-bold text-center">

                                        {
                                            DelayByhour ? `Early By ${data.payroll.tripTimeDifference}` :
                                                `Early By ${DelayMinute}`
                                        }

                                    </p> :
                                    <p className="text-green-500 font-bold text-center"> On Time</p>
                        }
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            RPS: {data.rps}
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${data.loadStatus === "Early"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                                }`}
                        >
                            Loading: {data.loadStatus}
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${data.payroll.tripStatus === "Late"
                                ? "bg-red-50 text-red-700"
                                : "bg-green-50 text-green-700"
                                }`}
                        >
                            Trip: {data.payroll.tripStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Details */}
            <div className="p-5">
                {/* Vehicle / Driver */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <InfoItem label="Driver" value={data.driverName} />
                    <InfoItem label="Vehicle Number" value={data.vehicleNumber} />
                    <InfoItem label="Touching Point" value={data.touchingPoint} />
                    <InfoItem label="Route" value={data.route} full />
                </div>

                {/* Timeline */}
                <div className="my-6 border-t border-gray-100" />

                <h3 className="mb-4 text-sm font-semibold text-gray-900">
                    Trip Timeline
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <TimeItem
                        label="Dispatch Time"
                        value={formatDateTime(data.dispatchTime)}
                    />

                    <TimeItem
                        label="In Time"
                        value={formatDateTime(data.inTime)}
                    />

                    <TimeItem
                        label="Unload Time"
                        value={formatDateTime(data.unloadTime)}
                    />

                    <TimeItem
                        label="Load Time"
                        value={formatDateTime(data.loadTime)}
                    />
                </div>

                {/* Time Stats */}
                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <StatBox
                        label="Given Time"
                        value={`${data.givenHour}h ${data.givenMinutes}m`}
                    />

                    <StatBox
                        label="Load Time"
                        value={`${data.loadhour}h ${data.loadminute}m`}
                    />

                    <StatBox
                        label="Loaded Time Taken"
                        value={data.loadedTimeTaken}
                    />

                    <StatBox
                        label="Time Difference"
                        value={data.loadedTimeDifference}
                        color="green"
                    />
                </div>

                {/* Payroll Toggle */}
                <button
                    onClick={() => setShowPayroll(!showPayroll)}
                    className="mt-6 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left transition hover:bg-gray-100"
                >
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Payroll</p>
                        <p className="text-xs text-gray-500">
                            Salary, penalty and incentive details
                        </p>
                    </div>

                    <svg
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${showPayroll ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m6 9 6 6 6-6"
                        />
                    </svg>
                </button>

                {/* Payroll Details */}
                {showPayroll && (
                    <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <PayrollItem
                                label="Incentive"
                                value={`₹${data.payroll.incentive}`}
                                color="green"
                            />

                            <PayrollItem
                                label="Penalty"
                                value={`₹${data.payroll.penalty}`}
                                color="red"
                            />

                            <PayrollItem
                                label="Trip Time Taken"
                                value={data.payroll.tripTimeTaken}
                            />

                            <PayrollItem
                                label="Time Difference"
                                value={data.payroll.tripTimeDifference}
                            />

                            <PayrollItem
                                label="Trip Salary"
                                value={`₹${data.payroll.tripSalary}`}
                            />

                            <PayrollItem
                                label="Trip Status"
                                value={data.payroll.tripStatus}
                                color="red"
                            />

                            <div className="col-span-2 rounded-xl bg-gray-900 p-4 md:col-span-2">
                                <p className="text-xs font-medium text-gray-400">
                                    Total Salary
                                </p>
                                <p className="mt-1 text-2xl font-bold text-white">
                                    ₹{data.payroll.TotalSalary}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------- Reusable Components ---------- */

function InfoItem({ label, value, full }) {
    return (
        <div className={full ? "sm:col-span-2 lg:col-span-1" : ""}>
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                {value}
            </p>
        </div>
    );
}

function TimeItem({ label, value }) {
    return (
        <div className="relative rounded-xl border border-gray-100 bg-gray-50 p-3">
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-blue-500" />
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
        </div>
    );
}

function StatBox({ label, value, color = "blue" }) {
    const colors = {
        blue: "bg-blue-50 text-blue-700",
        green: "bg-green-50 text-green-700",
    };

    return (
        <div className={`rounded-xl p-3 ${colors[color]}`}>
            <p className="text-xs font-medium opacity-70">{label}</p>
            <p className="mt-1 text-sm font-bold">{value}</p>
        </div>
    );
}

function PayrollItem({ label, value, color = "default" }) {
    const textColors = {
        default: "text-gray-900",
        green: "text-green-600",
        red: "text-red-600",
    };

    return (
        <div>
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className={`mt-1 text-sm font-bold ${textColors[color]}`}>
                {value}
            </p>
        </div>
    );
}

