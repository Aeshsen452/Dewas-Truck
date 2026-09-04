import { SquarePen, Trash, PhoneCall, UserStar } from "lucide-react"
import ActionLoader from "../../../components/Loader/ActionLoader"

const DriverCard = ({ v, handleDeleteDriver, update, deletePending, deleteId }) => {

    const deleting = deletePending && deleteId === v._id

    return (
        <div 
         onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-col gap-y-1">
            <h5 className=" font-semibold text-gray-800 col-span-2 flex items-center gap-x-2">
                <UserStar size={18} className="text-green-500" />
                : {v.driverName}
            </h5>
            <h5 className="font-semibold text-gray-800 col-span-2 flex items-center gap-x-2">

                <PhoneCall size={18} className="text-green-500" />

                : {v.driverNumber}
            </h5>

            {deleting ?
                <div className="flex justify-center items-center py-2">
                    <ActionLoader />
                </div>
                :
                <div className='flex justify-center items-center'>
                    <button
                        disabled={deletePending}
                        className="text-green-700 px-5 py-2"
                        style={{
                            cursor: deletePending ? "not-allowed" : "pointer"
                        }}
                        onClick={() => update(v)}
                    >
                        <SquarePen size={18} />
                    </button>
                    <button
                        disabled={deletePending}
                        className="text-red-700 px-5 py-2  "
                        onClick={() => handleDeleteDriver(v._id)}
                        style={{
                            cursor: deletePending ? "not-allowed" : "pointer"
                        }}
                    >
                        <Trash size={18} />
                    </button>

                </div>
            }

        </div>
    )
}

export default DriverCard