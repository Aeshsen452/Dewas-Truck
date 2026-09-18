import { Truck, ChevronDown } from 'lucide-react';
import { useGetDriver } from '../../driver/hooks/api.hooks';
import DataSpinner from '../../../components/Loader/DataSpinner';
import ErrorComponent from '../../../components/ErrorMessage';
import SelectComponent from './Select';

const DriverSelectCard = () => {

    const { data: drivers, isPending, error } = useGetDriver();

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

                    <SelectComponent data={drivers} />
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