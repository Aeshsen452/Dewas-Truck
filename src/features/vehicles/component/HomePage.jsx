
import usevehiclesHook from '../hooks/vehiclesHook';
import DataNotFound from '../../../components/NotFound';
import { Menu, Download, Upload, Search } from 'lucide-react';
import DataFetchingSpinner from "../../../components/Loader/DataFetchingSpinner";
import VehicleCard from './Card';
import FileUploadPopup from '../../../components/FileUploadBox';
import { useGetVehicle, useDeleteVehicle, useAddVehicles, useUpdateVehicles, useBulkAddVehicles } from '../hooks/api.hooks';
import SearchBar from '../../../components/SearchBar';
import vehicleExcelSample from "../../../../public/vehicleExcelSample.PNG"
import FileUploading from '../../../components/FileuploadingLoader';
import Scroll from '../../../components/Scoll';
import ErrorComponent from '../../../components/ErrorMessage';

const HomePage = () => {

    const { open, OpenForm, CloseForm, register, handleSubmit, errors,
        closeExcelBox, OpenExcelBox, ExcelDataBox,
        closeFileBox,
        openFileBox,
        openFilePopup,
        handleSetUpdate,
        updateId,

    } = usevehiclesHook();



    const { data, isPending, error, search, setSearch } = useGetVehicle();
    const { deleteMutate, deletePending, deleteId } = useDeleteVehicle();
    const { createMutate, createPending } = useAddVehicles();
    const { updateMutate, updatePending } = useUpdateVehicles();
    const { bulkMutate, bulkPending, excelFile, progress } = useBulkAddVehicles()



    if(error){
        return  <div className="p-20">
            <ErrorComponent />
            </div>
    }




    // main 

    return (
        < div className="flex flex-col relative min-h-full items-center justify-center bg-slate-100 p-6 " >



            {/* header portion  */}
            <div className=" w-full">

                <div className="flex justify-between items-center p-3 gap-x-5  relative">

                    <div className="flex-1">
                        <SearchBar search={search} setSearch={setSearch} />
                    </div>

                    <div className="flex justify-end items-center p-3 gap-x-5  relative">


                        <div className='relative w-20 flex justify-end  h-10'
                            onMouseEnter={OpenExcelBox}
                            onMouseLeave={closeExcelBox}
                        >


                            <button className='cursor-pointer'>
                                <Menu size={20} className='text-gray-500' />
                            </button>


                            {ExcelDataBox &&

                                <div className='w-24 h-20 bg-white border border-gray-400 flex flex-col gap-y-2 justify-center items-center absolute top-5 right-7 rounded-b-xl rounded-tl-3xl p-5'
                                >
                                    <button className='hover:font-bold text-sm  hover:border-b-2 hover:border-blue-700 cursor-pointer flex justify-center items-center gap-x-2' onClick={openFileBox}>Import <Upload size={15} /></button>

                                    <button className='hover:font-bold text-sm  hover:border-b-2 hover:border-blue-700 cursor-pointer flex justify-center items-center gap-x-2'>Export <Download size={15} /> </button>


                                </div>
                            }

                        </div>



                        <button
                            onClick={OpenForm}
                            className="bg-blue-700 p-2 rounded-lg text-white cursor-pointer font-bold">

                            {updateId ? "Update vehicle" : " Add vehicle"}

                        </button>


                    </div>
                </div>



                {
                    open &&
                    <form className="bg-white transition"
                        // onSubmit={handleSubmit(updateId ? handleUpdateRoute : handleRoute)}
                        onSubmit={handleSubmit(updateId ?
                            (data) => {
                                updateMutate(data, {
                                    onSuccess: () => {
                                        CloseForm();
                                    }
                                })
                            } :

                            (data) => {
                                createMutate(data, {
                                    onSuccess: () => {
                                        CloseForm();
                                    }
                                })
                            }
                        )}
                    >

                        <h1 className="px-5 font-bold text-2xl py-5">


                        </h1>

                        <div className=" grid  pt-2 px-5 gap-5 rounded">

                            {/* Enter Route  */}

                            <div className="" >

                                <input
                                    {...register("vehicleNumber", {
                                        required: "* vehicle Number is Required",
                                        maxLength: {
                                            value: 50,
                                            message: "* Maximum Length is 50"
                                        },
                                        minLength: {
                                            value: 5,
                                            message: "* Minimum Lenght is 5"
                                        }
                                    })}
                                    type="text"

                                    placeholder="Enter Vehicle Number (ex: MP 09 AB 1234)"
                                    className="border border-gray-400 p-3 outline-none rounded w-full " />

                                {
                                    errors.vehicleNumber &&
                                    <p className="text-red-700 text-sm">  {errors.vehicleNumber.message} </p>
                                }

                            </div>


                        </div>

                        <div className="flex justify-end px-5 ">
                            <div className="flex gap-x-5 py-5">
                                <button type="button" className="px-3 py-1 rounded  text-white font-semibold cursor-pointer bg-red-700"
                                    onClick={CloseForm}
                                >Cancel</button>
                                <button type="submit" className="px-3 py-1 rounded  text-white font-semibold cursor-pointer bg-green-700">

                                    {updateId ? "Save" : "Submit"}


                                </button>
                            </div>
                        </div>

                    </form>
                }




            </div>



            {/* data display portion  */}
            <div div className=" w-full" >

                {isPending ?

                    <div className="w-full h-96 flex justify-center items-center">
                        <DataFetchingSpinner />
                    </div>

                    :
                    (data && data.length > 0) ?

                        <div className="flex flex-col gap-y-5">
                            {/* // cards display here   */}
                            <div className="py-5 grid grid-cols-2 lg:grid-cols-4 gap-3  w-full">
                                {
                                    data.map((v) => (<VehicleCard v={v} key={v._id}
                                        handleDeleteVehicle={deleteMutate}
                                        deletePending={deletePending}
                                        deleteId={deleteId}
                                        update={handleSetUpdate}
                                    />))
                                }

                            </div>

                            {/* scroll to top button  */}

                            <Scroll />



                        </div>

                        // when no data found
                        :
                        <DataNotFound />

                }

            </div >



            {bulkPending && (
                <div className="absolute  z-50 opacity-90  w-full min-h-full flex justify-center py-5 ">
                    <FileUploading file={excelFile} progress={progress} />
                </div>
            )}

            {openFilePopup && (
                <div className="absolute  z-50 opacity-90  w-full min-h-full flex justify-center py-5 ">
                    <FileUploadPopup onClose={closeFileBox} filesrc={vehicleExcelSample}
                        onUpload={bulkMutate} />
                </div>
            )}


        </div >
    );
}

export default HomePage










