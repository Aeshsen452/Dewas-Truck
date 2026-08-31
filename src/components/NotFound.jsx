export default function DataNotFound() {
    return (
        <div className="flex min-h-[300px] w-full items-center justify-center">
            <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                    <svg
                        className="h-7 w-7 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 13V7a2 2 0 00-2-2h-3.5l-1.5-2h-2L9.5 5H6a2 2 0 00-2 2v10a2 2 0 002 2h6"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 18h6m-3-3v6"
                        />
                    </svg>
                </div>

                <h3 className="text-base font-semibold text-slate-800">
                    No data found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    There is no data available to display.
                </p>
            </div>
        </div>
    );
}