import { Trash, SquarePen } from "lucide-react";
import ActionLoader from "../../../components/Loader/ActionLoader";


export default function TripCard({ trip, handleDelete, update, updatePending, createPending, deletePending, deleteId }) {

    const deleteing = deletePending && deleteId === trip._id

    return (
        <div 
         onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* Route */}
            <div className="mb-5">
                <div className="flex justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Route
                    </p>



                </div>

                <h2 className="mt-1 text-xl font-bold capitalize text-slate-900">
                    {trip.route}
                </h2>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
                <Detail label="Diesel" value={trip.diesel} suffix="L" />

                <Detail
                    label="Salary"
                    value={`₹${Number(trip.salary).toLocaleString()}`}
                />

                <Detail
                    label="Incentive"
                    value={`₹${Number(trip.incentive).toLocaleString()}`}
                />

                <Detail
                    label="Late Charge"
                    value={`₹${Number(trip.latecharge).toLocaleString()}`}
                />
            </div>

            {/* actions button  */}

            {
                deleteing || updatePending || createPending ?
                    <div className="flex justify-center items-center py-2">
                        <ActionLoader />
                    </div>
                    :

                    <div className="py-3 flex justify-center items-center gap-x-10">

                        <button className="cursor-pointer" onClick={() => update(trip)}> <SquarePen size={20} className="text-green-500 font-bold" /> </button>

                        <button className="cursor-pointer"> <Trash size={20} className="text-red-700" onClick={() => handleDelete(trip._id)} /> </button>

                    </div>

            }
        </div>
    );
}

function Detail({ label, value, suffix }) {
    return (
        <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500">{label}</p>

            <p className="mt-1 text-lg font-semibold text-slate-900">
                {value}
                {suffix && (
                    <span className="ml-1 text-xs font-medium text-slate-400">
                        {suffix}
                    </span>
                )}
            </p>
        </div>
    );
}