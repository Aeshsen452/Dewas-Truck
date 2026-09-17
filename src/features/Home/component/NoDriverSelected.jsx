const NoDriverSelected = () => {
    return (
        <div className="flex min-h-[300px] w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <div className="flex flex-col items-center text-center">

                {/* Icon */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                    <svg
                        className="h-8 w-8 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19a3 3 0 01-6 0m6 0a3 3 0 00-6 0m6 0h2a2 2 0 002-2v-5a7 7 0 10-14 0v5a2 2 0 002 2h2"
                        />
                    </svg>
                </div>

                {/* Text */}
                <h2 className="text-lg font-semibold text-slate-800">
                    No Driver Selected
                </h2>

                <p className="mt-1 max-w-sm text-sm text-slate-500">
                    Please select a driver to view dashboard details,
                    routes and performance data.
                </p>
            </div>
        </div>
    );
};

export default NoDriverSelected;