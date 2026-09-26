import { Pencil, Trash2, Eye } from "lucide-react";
import ActionLoader from "../../../components/Loader/ActionLoader";

const VehicleCard = ({
    onView,
    data,
    handleDelete,
    deletePending,
    deleteId,
    handleSetUpdate

}) => {

    const isDeleting = data._id === deleteId;
    const isProgress = deletePending

    const style = {
        cursor: isProgress ? "not-allowed" : "pointer"
    }


    const { date, rps, payroll: { tripStatus }, vehicleNumber, driverName } = data
    const isEarly = tripStatus === "Early";

    return (
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Date
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                        {date}
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${isEarly
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {tripStatus}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-500">RPS</span>
                    <span className="font-semibold text-gray-900">
                        {rps}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Driver Name</span>
                    <span className="font-semibold text-gray-900">
                        {driverName}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Vehicle Number</span>
                    <span className="font-semibold text-gray-900">
                        {vehicleNumber}
                    </span>
                </div>


            </div>

            {/* View Details */}
            <button
                onClick={() => onView(data)}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
                <Eye size={17} />
                View Full Details
            </button>

            {/* Edit / Delete */}
            <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                    onClick={() => handleSetUpdate(data)}
                    disabled={isProgress}
                    style={style}
                    className="flex  items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                    <Pencil size={16} />
                    Edit
                </button>

                <button
                    disabled={isProgress}
                    onClick={() => handleDelete(data._id)}
                    style={style}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >

                    {
                        isDeleting ? <ActionLoader /> :
                            <>
                                <Trash2 size={16} /> Delete
                            </>
                    }

                </button>
            </div>
        </div>
    );
};

export default VehicleCard;
