import { Menu, Upload, Download, ArrowBigUpDash } from "lucide-react"
import DataNotFound from "../../../components/NotFound";
import DriverCard from "./Card";
import useDriverHook from "../hooks/driver.hooks"
import DataFetchingSpinner from "../../../components/Loader/DataFetchingSpinner";
import { useAddDriver, useGetDriver, useDeleteDriver, useUpdateDriver, useBulkAddDriver } from "../hooks/api.hooks";
import FileUploadPopup from "../../../components/FileUploadBox";
import driverExcelSample from "../../../../public/driverExcelSample.PNG"
import FileUploading from "../../../components/FileuploadingLoader";
import SearchBar from "../../../components/SearchBar";
import Scroll from "../../../components/Scoll";
import ErrorComponent from "../../../components/ErrorMessage";

const DriverHome = () => {

    // calling the state and functions from custom hooks 

    const {

        // Rhf fn and state 
        register, handleSubmit, errors,

        // whenver hover on menu icon then this state and function execute 
        ExcelDataBox, closeExcelBox, OpenExcelBox,

        // when click on import data then select file popup bar open 
        openFilePopup, openFileBox, closeFileBox,
        //    update or add form and functions 
        open, OpenForm, CloseForm,
        // actions button function 
        SetUpdatedData, updatedId,

    } = useDriverHook();

    const { data, isPending, isError, search, setSearch } = useGetDriver();
    const { deleteMuate, deletePending, deleteId } = useDeleteDriver();
    const { updateMutate, updatePending } = useUpdateDriver();
    const { CreateMuate, createPending } = useAddDriver();
    const { mutate: bulkAddDriver, isPending: bulkPending, progress, excelFile } = useBulkAddDriver();


    // if (isPending) {
    //     return (
    //         <div className="w-full h-[80vh] flex justify-center items-center">
    //             <DataFetchingSpinner />
    //         </div>
    //     );
    // }


    if (isError) {
        return  <div className="p-20">
            <ErrorComponent />
            </div>
    }







    return (
        < div className="flex flex-col relative min-h-full items-center justify-center bg-slate-100 p-6 " >


            {/* Header portion  */}

            < div className=" w-full" >
                <div className="flex justify-between items-center p-3 gap-x-5  relative">

                    <div className="flex-1">
                        <SearchBar search={search} setSearch={setSearch} />
                    </div>

                    <div className="flex-1  flex justify-end items-center p-3 gap-x-5  relative">

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
                            {updatedId ? "Update Driver Info" : " Add Driver Info"}

                        </button>

                    </div>

                </div>



                {/* Add and Update driver Form  */}
                {
                    open &&
                    <form className="bg-white transition py-5 "
                        onSubmit=
                        {handleSubmit

                            (updatedId ? (data) => {
                                updateMutate(data, {
                                    onSuccess: () => {
                                        CloseForm()
                                    }
                                })
                            } : (data) => {
                                CreateMuate(data, {
                                    onSuccess: () => {
                                        CloseForm()
                                    }
                                })
                            }

                            )

                        }
                    >



                        <div className=" grid grid-cols-2 pt-2 px-5 gap-5 rounded">

                            {/* Enter Driver Name  */}

                            <div className="" >

                                <input
                                    {...register("driverName", {
                                        required: "* Driver Name  is Required",
                                        maxLength: {
                                            value: 30,
                                            message: "* Maximum Length is 30"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "* Minimum Lenght is 3"
                                        }
                                    })}
                                    type="text"

                                    placeholder="Enter Driver Name"
                                    className="border border-gray-400 p-3 outline-none rounded w-full " />

                                {
                                    errors.driverName &&
                                    <p className="text-red-700 text-sm">  {errors.driverName.message} </p>
                                }

                            </div>


                            {/* Enter Driver Number  */}

                            <div className="" >

                                <input
                                    {...register("driverNumber", {
                                        required: "* Driver Number  is Required",
                                        maxLength: {
                                            value: 10,
                                            message: "* Maximum Length is 10"
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "* Minimum Length is 10"
                                        }
                                    })}
                                    type="number"

                                    placeholder="Enter Driver Mobile Number"
                                    className="border border-gray-400 p-3 outline-none rounded w-full " />

                                {
                                    errors.driverNumber &&
                                    <p className="text-red-700 text-sm">  {errors.driverNumber.message} </p>
                                }

                            </div>


                        </div>

                        <div className="flex justify-end px-5 ">
                            <div className="flex gap-x-5 py-5">
                                <button type="button" className="px-3 py-1 rounded  text-white font-semibold cursor-pointer bg-red-700"
                                    onClick={CloseForm}
                                >Cancel</button>
                                <button type="submit" className="px-3 py-1 rounded  text-white font-semibold cursor-pointer bg-green-700">

                                    {updatedId ? "Save" : "Submit"}




                                </button>
                            </div>
                        </div>

                    </form>
                }




            </div>

            {/* data display portion  */}
            <div div className=" w-full h-full" >

                {
                    isPending ? <div className="w-full h-[80vh] flex justify-center items-center">
                        <DataFetchingSpinner />
                    </div> :

                        (data && data.length > 0) ?
                            <div className="flex flex-col gap-y-5">
                                {/* // cards display here   */}
                                <div className="py-5 grid grid-cols-3 gap-3  w-full">
                                    {
                                        data.map((v) => (<DriverCard v={v} key={v._id}
                                            handleDeleteDriver={deleteMuate}
                                            update={SetUpdatedData}
                                            deleteId={deleteId}
                                            deletePending={deletePending}
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
                    <FileUploadPopup onClose={closeFileBox} filesrc={driverExcelSample} onUpload={(file) => bulkAddDriver({ file })} />
                </div>
            )}



        </div >
    )
}

export default DriverHome





