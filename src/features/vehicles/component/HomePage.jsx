import React, { useEffect, useState } from 'react'
import usevehiclesHook from '../hooks/vehiclesHook';
import { useSelector } from 'react-redux';
import DataNotFound from '../../../components/NotFound';
import { ArrowBigUpDash, Menu, Download, Upload, Search } from 'lucide-react';
import DataFetchingSpinner from "../../../components/Loader/DataFetchingSpinner";
import VehicleCard from './Card';
import FileUploadPopup from '../../../components/FileUploadBox';
import FileLoader from '../../../components/FileuploadingLoader';

const HomePage = () => {

    const { open, OpenForm, CloseForm, register, handleSubmit, errors, handleSubmitForm, scrollTop,
        closeExcelBox, OpenExcelBox, ExcelDataBox,
        closeFileBox,
        openFileBox,
        openFilePopup,
        handleExcelFile,
        handleDeleteVehicle,
        handleSetUpdate,
        updateId,
        handleUpdateVehicle,
        handleHydrating,
        searching,
        search

    } = usevehiclesHook();

    const { isLoading, value, isFileLoading, uploadProgress, file } = useSelector((state) => state.vehicle);


    useEffect(() => {
        handleHydrating();
    }, [])




    //    whenever we add,edit ,delete this will work 

    if (isLoading) {
        return <div className="w-full h-[80vh] flex justify-center items-center">
            <DataFetchingSpinner />
        </div>
    }



    if (isFileLoading) {
        <div className='flex justify-center items-center h-[80vh]'>
            <FileLoader file={file} progress={uploadProgress} />
        </div>

    }


    //   open file upload popup 
    if (openFilePopup) {
        return <FileUploadPopup onClose={closeFileBox} onUpload={handleExcelFile} filesrc={"../../public/vehicleExcelSample.PNG"} />
    }

    // main 

    return (
        <div className="flex flex-col items-center justify-center bg-slate-100 p-6 ">


            {/* header portion  */}
            <div className=" w-full">
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

                {
                    open &&
                    <form className="bg-white transition"
                        // onSubmit={handleSubmit(updateId ? handleUpdateRoute : handleRoute)}
                        onSubmit={handleSubmit(updateId ? handleUpdateVehicle : handleSubmitForm)}
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


                <div className=' relative p-5'>
                    <Search className='absolute top-7 left-7 text-blue-700 font-bold' />

                    <input type='search' placeholder='Search By vehicleNumber'
                        value={search}
                        className='  outline-none border px-10 py-2 rounded w-1/2 border-gray-500' onChange={(e) => searching(e.target.value)} />
                </div>



            </div>

            {/* data display portion  */}
            <div div className=" w-full" >
                {
                    value.length > 0 ?

                        <div className="flex flex-col gap-y-5">
                            {/* // cards display here   */}
                            <div className="py-5 grid grid-cols-4 gap-3  w-full">
                                {
                                    value.map((v) => (<VehicleCard v={v} key={v._id} handleDeleteVehicle={handleDeleteVehicle} update={handleSetUpdate} />))
                                }

                            </div>

                            {/* scroll to top button  */}

                            <div className="bg-green-700 text-white bottom-10 fixed right-10 w-10 h-10 flex justify-center items-center rounded-full cursor-pointer " onClick={scrollTop}>  <ArrowBigUpDash />   </div>



                        </div>

                        // when no data found  
                        :
                        <DataNotFound />

                }

            </div >


        </div >
    );
}

export default HomePage










