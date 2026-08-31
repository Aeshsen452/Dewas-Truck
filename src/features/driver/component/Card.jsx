import { SquarePen, Trash } from "lucide-react"

const DriverCard = ({ v, handleDeleteDriver, update }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-col gap-y-1">
            <h5 className=" font-semibold text-gray-800 col-span-2">
                Driver Name : {v.driverName}
            </h5>
            <h5 className="font-semibold text-gray-800 col-span-2">
                Driver Number : {v.driverNumber}
            </h5>

            <div className='flex justify-end items-center gap-x-3 cursor-pointer'>
                <button className="text-green-700"
                    onClick={() => update(v)}
                >
                    <SquarePen size={18} />
                </button>
                <button className="text-red-700 cursor-pointer"
                    onClick={() => handleDeleteDriver(v._id)}
                >
                    <Trash size={18} />
                </button>

            </div>

        </div>
    )
}

export default DriverCard