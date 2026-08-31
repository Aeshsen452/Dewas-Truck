import useTripHook from "../hooks/triphooks"
import { Menu, Search, Upload, Download, ArrowBigUpDash } from "lucide-react";
import DataNotFound from "../../../components/NotFound";
import DataFetchingSpinner from "../../../components/Loader/DataFetchingSpinner";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import TripCard from "./tripCard";

const TripHome = () => {

  const {
    open,
    OpenForm,
    CloseForm,

    register,
    handleSubmit,
    errors,
    handleSubmitForm,
    scrollTop,
    closeExcelBox,
    OpenExcelBox,
    ExcelDataBox,
    closeFileBox,
    openFileBox,
    openFilePopup,
    handleExcelFile,


    handleSetUpdate,
    updateId,
    handleHydrating,
    searching,
    search,
    enableTouching
  } = useTripHook();


  const { value, driverNames, vehicleNumbers, Routes, isLoading, fetchDataLoader } = useSelector((state) => state.trip)




  useEffect(() => {
    handleHydrating();
  }, [])

  if (isLoading) {
    return <DataFetchingSpinner />
  }



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

            {updateId ? "Update Trip" : " Add Trip"}

          </button>


        </div>

        {
          open &&
          <form className="bg-white transition"
            onSubmit={handleSubmit(updateId ? handleUpdateVehicle : handleSubmitForm)}
          >


            {/* RPS DRIVER , VEHICLE ,  */}

            <h1 className="px-5 font-bold  py-5">

              Trip
            </h1>

            <div className=" grid grid-cols-3 pt-2 px-5 gap-5 rounded">


              {/* Date  */}

              <div className="" >

                <input
                  {...register("date", {
                    required: "* Date is Required",

                  })}
                  type="date"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />

                {
                  errors.date &&
                  <p className="text-red-700 text-sm">  {errors.date.message} </p>
                }

              </div>


              {/* Rps  */}

              <div className="" >

                <input
                  {...register("rps", {
                    required: "* RPS Number is Required",
                    maxLength: {
                      value: 10,
                      message: "* Maximum Length is 10"
                    },
                    minLength: {
                      value: 5,
                      message: "* Minimum Length is 5"
                    }
                  })}
                  type="number"

                  placeholder="Enter RPS Number (ex: 800****)"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />

                {
                  errors.rps &&
                  <p className="text-red-700 text-sm">  {errors.rps.message} </p>
                }

              </div>


              {/* Driver Name  */}

              <div className="" >


                <input
                  {...register("driverName", {
                    required: "* Driver Name is Required",
                    maxLength: {
                      value: 10,
                      message: "* Maximum Length is 10"
                    },
                    minLength: {
                      value: 10,
                      message: "* Minimum Lenght is 10"
                    }
                  })}
                  type="text"
                  list='driver'
                  placeholder="Enter Driver Name"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />



                <datalist id="driver">
                  {driverNames?.map((d) => (
                    <option key={d._id} value={d.driverNumber}>
                      {d.driverName}
                    </option>
                  ))}
                </datalist>



                {
                  errors.driverName &&
                  <p className="text-red-700 text-sm">  {errors.driverName.message} </p>
                }

              </div>



              {/* Vehicle Number  */}

              <div className="" >


                <input
                  {...register("vehicleNumber", {
                    required: "* Vehicle Number is Required",
                    maxLength: {
                      value: 30,
                      message: "* Maximum Length is 30"
                    },
                    minLength: {
                      value: 5,
                      message: "* Minimum Lenght is 5"
                    }
                  })}
                  type="text"
                  list='vehicles'
                  placeholder="Enter Vehicle Number (ex: MP 09 AB 1234)"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />



                <datalist id='vehicles'

                  className='border border-amber-900 p-2 rounded w-full'>

                  {
                    vehicleNumbers?.map((v) => (<option value={v.vehicleNumber}> {v.vehicleNumber} </option>))
                  }
                </datalist>



                {
                  errors.vehicleNumber &&
                  <p className="text-red-700 text-sm">  {errors.vehicleNumber.message} </p>
                }

              </div>


              {/* Route  */}

              <div className="" >


                <input
                  {...register("route", {
                    required: "* Route Number is Required",
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
                  list='route'
                  placeholder="ex. Indore-Pithampur"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />



                <datalist id='route'

                  className='border border-amber-900 p-2 rounded w-full'>

                  {
                    Routes?.map((r) => (<option value={r.route}> {r.route} </option>))
                  }
                </datalist>



                {
                  errors.route &&
                  <p className="text-red-700 text-sm">  {errors.route.message} </p>
                }

              </div>

            </div>


            {/* Time Input  */}

            <div className=" grid grid-cols-3 pt-2 px-5 gap-5 rounded">


              {/* Dispatch Time (gadi kab nikli) */}

              <div className="" >
                <p className="flex justify-center py-2">Dispatch Time</p>

                <input
                  {...register("dispatchTime", {
                    required: "* Dispatch Time is Required",

                  })}
                  type="datetime-local"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />

                {
                  errors.dispatchTime &&
                  <p className="text-red-700 text-sm">  {errors.dispatchTime.message} </p>
                }

              </div>


              {/* In Time (means gadi kab pauchi)  */}

              <div className="" >
                <p className="flex justify-center py-2">In Time</p>

                <input
                  {...register("inTime", {
                    required: "* In Time is Required",

                  })}
                  type="datetime-local"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />

                {
                  errors.inTime &&
                  <p className="text-red-700 text-sm">  {errors.inTime.message} </p>
                }

              </div>

              {/* Given Time and mintues in hour */}

              <div className="" >
                <p className="flex justify-center py-2">Given Time </p>

                <div className="flex gap-x-2">

                  <div>
                    <input
                      {...register("givenHour", {
                        required: "* Given Hour is Required",
                        maxLength: {
                          value: 3,
                          message: "maximum 999 hours allowed "
                        }

                      })}
                      placeholder="Enter Hours"
                      type="number"
                      className="border border-gray-400 p-3 outline-none rounded w-full " />

                    {
                      errors.givenHour &&
                      <p className="text-red-700 text-sm">  {errors.givenHour.message} </p>
                    }
                  </div>

                  <div>
                    <input
                      {...register("givenMinutes", {
                        required: "* Given Minutes is Required",
                        maxLength: {
                          value: 2,
                          message: "allowed 60 minutes"
                        }

                      })}
                      placeholder="Enter Minutes"
                      type="number"
                      className="border border-gray-400 p-3 outline-none rounded w-full " />

                    {
                      errors.givenMinutes &&
                      <p className="text-red-700 text-sm">  {errors.givenMinutes.message} </p>
                    }
                  </div>





                </div>



              </div>


            </div>





            {/* Loading Time Inputs And Touching points   */}

            {enableTouching &&

              <div>

                {/* Touching Points  */}

                <div className=" grid pt-2 px-5 gap-5 rounded">



                  <div className="" >
                    <p className="flex justify-center py-2">Touching Point</p>

                    <input
                      {...register("touchingPoint", {
                        required: "Touching Point is required",
                        maxLength: {
                          value: 50,
                          message: "maximum 50 character are allowed"
                        }

                      })}
                      type="text"
                      className="border border-gray-400 p-3 outline-none rounded w-full " />

                    {
                      errors.touchingPoint &&
                      <p className="text-red-700 text-sm">  {errors.touchingPoint.message} </p>
                    }

                  </div>




                </div>



                {/* Loaded and unloaded  */}

                <div className=" grid grid-cols-3 pt-2 px-5 gap-5 rounded">


                  {/*Unload Loading Time  */}

                  <div className="" >
                    <p className="flex justify-center py-2">UnLoad Time</p>

                    <input
                      {...register("unloadTime", {
                        required: "* unLoad Time is Required",

                      })}
                      type="datetime-local"
                      className="border border-gray-400 p-3 outline-none rounded w-full " />

                    {
                      errors.unloadTime &&
                      <p className="text-red-700 text-sm">  {errors.unloadTime.message} </p>
                    }

                  </div>



                  {/*load Loading Time  */}
                  <div className="" >
                    <p className="flex justify-center py-2">Load Time</p>

                    <input
                      {...register("loadTime", {
                        required: "* Load Time is Required",

                      })}
                      type="datetime-local"
                      className="border border-gray-400 p-3 outline-none rounded w-full " />

                    {
                      errors.loadTime &&
                      <p className="text-red-700 text-sm">  {errors.loadTime.message} </p>
                    }

                  </div>

                  {/* Given Loaded and unloaded Time in hour and minutes*/}

                  <div className="" >
                    <p className="flex justify-center py-2">Given Unloaded & Loaded Time </p>

                    <div className="flex gap-x-2">

                      <div>
                        <input
                          {...register("loadhour", {
                            required: "* Loaded Hour is Required",
                            maxLength: {
                              value: 3,
                              message: "maximum 999 hours allowed "
                            }

                          })}
                          placeholder="Enter Hours"
                          type="number"
                          className="border border-gray-400 p-3 outline-none rounded w-full " />

                        {
                          errors.loadhour &&
                          <p className="text-red-700 text-sm">  {errors.loadhour.message} </p>
                        }
                      </div>

                      <div>
                        <input
                          {...register("loadminute", {
                            required: "* Loaded Minutes is Required",
                            maxLength: {
                              value: 2,
                              message: "allowed 60 minutes"
                            }

                          })}
                          placeholder="Enter Minutes"
                          type="number"
                          className="border border-gray-400 p-3 outline-none rounded w-full " />

                        {
                          errors.loadminute &&
                          <p className="text-red-700 text-sm">  {errors.loadminute.message} </p>
                        }
                      </div>





                    </div>



                  </div>


                </div>

              </div>
            }

            {/* remark and refunded amount  */}

            <div className=" grid grid-cols-3 pt-2 px-5 gap-5 rounded">


              {/* reamrk  */}

              <div className=" col-span-2" >

                <textarea
                  rows={5}
                  {...register("remark", {
                    maxLength: {
                      value: 500,
                      message: "maximum 500 character are allowed"
                    }

                  })}
                  placeholder="Enter remark ---> "
                  className="border border-gray-400 p-3 outline-none rounded w-full " />

                {
                  errors.remark &&
                  <p className="text-red-700 text-sm">  {errors.remark.message} </p>
                }

              </div>

              {/* Amount to be refunded  */}
              <div className="" >
                <p className="flex justify-center py-2">amount to be refunded if applicable</p>

                <input
                  {...register("refundedamount", {
                    maxLength: {
                      value: 4,
                      message: "please check amount is too high max:9999 refunded"
                    }

                  })}
                  type="number"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />

                {
                  errors.refundedamount &&
                  <p className="text-red-700 text-sm">  {errors.refundedamount.message} </p>
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


        {/* <div className=' relative p-5'>
          <Search className='absolute top-7 left-7 text-blue-700 font-bold' />

          <input type='search' placeholder='Search By vehicleNumber'
            value={search}
            className='  outline-none border px-10 py-2 rounded w-1/2 border-gray-500' onChange={(e) => searching(e.target.value)} />
        </div> */}



      </div>




      {/* data display portion  */}
      <div div className=" w-full" >
        {
          value.length > 0 ?

            <div className="flex flex-col gap-y-5">
              {/* // cards display here   */}
              <div className="py-5 grid  gap-3  w-full">

                {value.map((t) => (<TripCard key={t._id}  data={t} />))}



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
  )
}

export default TripHome