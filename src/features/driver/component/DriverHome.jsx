import { Menu, Upload, Download, ArrowBigUpDash } from "lucide-react"
import DataNotFound from "../../../components/NotFound";
import { scrollTop } from "../../../utils/Scroll";
import DriverCard from "./Card";
import useDriverHook from "../hooks/driver.hooks"
import { useSelector } from "react-redux";
import DataFetchingSpinner from "../../../components/Loader/DataFetchingSpinner";
import { useEffect } from "react";
const DriverHome = () => {

    // calling the state and functions from custom hooks 

    const {

        // Rhf fn and state 
        register, handleSubmit, errors,

        // whenver hover on menu icon then this state and function execute 
        ExcelDataBox, closeExcelBox, OpenExcelBox,

        // when click on import data then select file popup bar open 
        openFilePopup, openFileBox,

        //    update or add form and functions 
        open, OpenForm, CloseForm, handleSubmitForm,

        // hydrating 
        hydrating,

        // actions button function 

        handleDeleteDriver, SetUpdatedData, handleUpdate, updatedId


    } = useDriverHook();


    const { value, isLoading } = useSelector((state) => state.driver);

    useEffect(() => {
        hydrating();
    }, [])



    if (isLoading) {
        return <div className="w-full h-[80vh] flex justify-center items-center">
            <DataFetchingSpinner />
        </div>
    }

    return (
        < div className="flex flex-col items-center justify-center bg-slate-100 p-6 " >
            < div className=" w-full" >
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



                        {updatedId ? "Update Driver Info" : " Add Driver Info"}

                    </button>





                </div>



                {/* Add and Update driver Form  */}
                {
                    open &&
                    <form className="bg-white transition"
                        onSubmit={handleSubmit(updatedId ? handleUpdate : handleSubmitForm)}
                    >

                        <h1 className="px-5 font-bold text-2xl py-5">


                        </h1>

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
                                    type="text"

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
            <div div className=" w-full" >
                {
                    value.length > 0 ?

                        <div className="flex flex-col gap-y-5">
                            {/* // cards display here   */}
                            <div className="py-5 grid grid-cols-4 gap-3  w-full">
                                {
                                    value.map((v) => (<DriverCard v={v} key={v._id}
                                        handleDeleteDriver={handleDeleteDriver}
                                        update={SetUpdatedData}
                                    />))
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


        </div>
    )
}

export default DriverHome





