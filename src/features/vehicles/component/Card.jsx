import { Trash, SquarePen } from "lucide-react";

const VehicleCard = ({ v, handleDeleteVehicle, update }) => {


    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 grid grid-cols-3">
            <h3 className="text-lg font-semibold text-gray-800 col-span-2">
                {v.vehicleNumber}
            </h3>
            <div className='flex justify-center items-center gap-x-3 cursor-pointer'>
                <button className="text-green-700" onClick={() => update(v)}>
                    <SquarePen size={18} />
                </button>
                <button className="text-red-700 cursor-pointer" onClick={() => handleDeleteVehicle(v._id)}>
                    <Trash size={18} />
                </button>

            </div>

        </div>
    );
};

export default VehicleCard;