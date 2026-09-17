import { Truck, ChevronDown } from 'lucide-react';
import { useGetDriver } from '../../driver/hooks/api.hooks';
import DataSpinner from '../../../components/Loader/DataSpinner';
import { SelectingDriver } from '../state/dash.Slice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../../components/ErrorMessage';


const DriverSelectCard = () => {

    const { data: drivers, isPending, error } = useGetDriver();

    const dispatch = useDispatch();
    const { selectedDriver } = useSelector((state) => state.dash);

    if (error) {
        return <ErrorComponent />

    }

    return (
        <div className=" rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <h2 className="font-semibold text-gray-900">Select Driver</h2>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                    Choose a driver to view details
                </p>
            </div>

            <div className="relative">


                {isPending ?
                    <div className=' w-full h-20 relative flex justify-center items-center gap-x-8'>
                        <DataSpinner /> <span className='text-xs text-gray-400'> Fetching drivers Name  </span>
                    </div> :


                    <select
                        value={selectedDriver}
                        onChange={(e) => dispatch(SelectingDriver(e.target.value))}
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm font-medium text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                        <option value={""}>
                            Choose Driver Name
                        </option>

                        {drivers && drivers.length > 0 && drivers.map((driver) => (
                            <option key={driver._id} value={driver.driverName}>
                                {driver.driverName}
                            </option>
                        ))}
                    </select>


                }





                {
                    !isPending &&
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                }
            </div>

        </div>
    )
}

export default DriverSelectCard