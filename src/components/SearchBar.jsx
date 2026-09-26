const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="relative w-full max-w-md ">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                />
            </svg>
        </div>
    );
};

export default SearchBar;
