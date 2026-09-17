const Metric = ({ label, value }) => {

    return (
        <div className="relative mb-3 last:mb-0">

            <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">

                <span className="text-xs font-medium text-slate-500">
                    {label}
                </span>

                <span className="text-sm font-semibold text-slate-800">
                    {value}
                </span>

            </div>

        </div>
    );
};

export default Metric


