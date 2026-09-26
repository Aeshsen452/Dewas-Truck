
import useRoute from "../hooks/Route";
import TripCard from "./TripCard";
import DataNotFound from "../../../components/NotFound";
import DataFetchingSpinner from "../../../components/Loader/DataFetchingSpinner";
import { Menu, Upload, Download } from "lucide-react";
import SearchBar from "../../../components/SearchBar";
import { useGetRoute, useAddRoute, useDeleteRoute, useUpdateRoute, useBulkAddRoute, useBulkGetRoute } from "../hooks/route.hooks";
import FileUploadPopup from "../../../components/FileUploadBox";
import routeExcelSample from "../../../../public/routeExcelSample.PNG";
import FileUploading from "../../../components/FileuploadingLoader";
import Scroll from "../../../components/Scoll";
import ErrorComponent from "../../../components/ErrorMessage";
import { Pagination } from "antd";
import ActionLoader from "../../../components/Loader/ActionLoader";

const TripHome = () => {

  const { register, errors, handleSubmit,
    openAddingBox, setOpenBox, Closing, setUpdateId,
    updateId, setUpData,
    closeExcelBox,
    OpenExcelBox,
    openFileBox,
    closeFileBox,
    handleExcelFile,
    openFilePopup, ExcelDataBox
  } = useRoute();


  const { data, isPending, error, search, setSearch, currentPage, setCurrentPage, itemPerPage } = useGetRoute();
  const { createMutate, createPending } = useAddRoute();
  const { updateMutate, updatePending } = useUpdateRoute();
  const { deleteMutate, deletePending, deleteId } = useDeleteRoute();
  const { bulkMutate, bulkPending, excelFile, progress } = useBulkAddRoute();
  const { ExportData, ExportPending, ExportError } = useBulkGetRoute();



  // if (error) {
  //   return <div className="p-20">
  //     <ErrorComponent />
  //   </div>
  // }



  return (
    < div className="flex flex-col relative min-h-full items-center justify-center bg-slate-100 p-6 " >

      {/* header portion  */}

      <div className=" w-full">

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

                  <button className='hover:font-bold text-sm  hover:border-b-2 hover:border-blue-700 cursor-pointer flex justify-center items-center gap-x-2' onClick={ExportData} disabled={ExportPending}>
                    {
                      ExportPending ? <ActionLoader /> : <>  Export <Download size={15} />  </>
                    }



                  </button>


                </div>
              }

            </div>


            <button
              onClick={() => setOpenBox(!openAddingBox)}
              className="bg-blue-700 p-2 rounded-lg text-white cursor-pointer font-bold">

              {updateId ? "Update Route" : "Add Route"}

            </button>
          </div>


        </div>


        {
          openAddingBox &&

          <form className="bg-white transition"
            onSubmit={handleSubmit(updateId ?
              (data) => updateMutate(data, { onSuccess: () => Closing() }) : (data) => createMutate(data, { onSuccess: () => Closing() })


            )}>

            <h1 className="px-5 font-bold text-2xl py-5">
              {updateId ? "Updating Route" : "Adding Route"}

            </h1>

            <div className=" grid grid-cols-7 pt-2 px-5 gap-5 rounded">

              {/* Enter Route  */}

              <div className="col-span-3" >


                <input
                  {...register("route", {
                    required: "* Route is Required",
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

                  placeholder="Enter Route (for ex:Indore-Pithampur)"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />

                {
                  errors.route &&
                  <p className="text-red-700 text-sm">  {errors.route.message} </p>
                }

              </div>

              {/* Enter Diesel */}

              <div>

                <input
                  type="number"
                  {...register("diesel", {
                    required: "* Diesel is required",
                    maxLength: {
                      value: 4,
                      message: "* Maximuum Diesel Length is 4"
                    }
                  })}

                  placeholder="Diesel"
                  className="border border-gray-400 p-3 outline-none rounded w-full"
                />

                {
                  errors.diesel &&
                  <p className="text-red-700 text-sm"> {errors.diesel.message} </p>
                }


              </div>



              {/* Enter Salary  */}


              <div>

                <input
                  type="number"
                  {
                  ...register("salary", {
                    required: "* Salary is Required",
                    maxLength: {
                      value: 5,
                      message: "Salary is too high please check"
                    }
                  })
                  }
                  placeholder="Salary"
                  className="border border-gray-400 p-3 outline-none rounded w-full " />

                {
                  errors.salary &&
                  <p className="text-red-700 text-sm"> {errors.salary.message} </p>
                }

              </div>



              {/* Enter Incentive  */}

              <div>

                <input type="number"

                  {...register("incentive", {
                    required: "* please provide incentive",
                    maxLength: {
                      value: 4,
                      message: "* please check incentive amount is too high"
                    }
                  })}

                  placeholder="Incentive" className="w-full border border-gray-400 p-3 outline-none rounded" />

                {
                  errors.incentive &&
                  <p className="text-red-700 text-sm"> {errors.incentive.message} </p>
                }
              </div>


              {/* Enter LateCharge  */}

              <div>

                <input
                  {...register("latecharge", {
                    required: "* Enter LateCharge",
                    maxLength: {
                      value: 4,
                      message: "* please check late charge is too much deducted"
                    }
                  })
                  }
                  type="number" placeholder="LateCharge"
                  className="border border-gray-400 p-3 outline-none w-full
              rounded" />

                {
                  errors.latecharge
                  &&
                  <p className="text-red-700 text-sm"> {errors.latecharge.message} </p>
                }


              </div>

            </div>

            <div className="flex justify-end px-5 ">
              <div className="flex gap-x-5 py-5">

                <button type="button" className="px-3 py-1 rounded  text-white font-semibold  bg-red-700" onClick={Closing}
                  disabled={createPending || updatePending || deletePending}
                  style={{
                    cursor: (createPending || updatePending || deletePending) ? "not-allowed" : "pointer"
                  }}

                >Cancel</button>


                <button type="submit" className="px-3 py-1 rounded  text-white font-semibold  bg-green-700" disabled={createPending || updatePending || deletePending}
                  style={{
                    cursor: (createPending || updatePending) ? "progress" : deletePending ? "not-allowed" : "pointer"
                  }}
                >

                  {(createPending || updatePending) ? "please wait" : updateId ? "Save" : "Submit"}
                </button>


              </div>
            </div>

          </form>

        }



      </div>



      <div className=" w-full">

        {
          isPending ? <div className="w-full h-96 flex justify-center items-center">
            <DataFetchingSpinner />
          </div>

            :
            (data && data.data.length > 0) ?

              <div className="flex flex-col gap-y-5">

                <div className="py-5 grid grid-cols-1 lg:grid-cols-4 gap-3  w-full">
                  {
                    data.data.map(r => (
                      <TripCard key={r.id} trip={r}
                        handleDelete={deleteMutate}
                        update={setUpData}
                        updatePending={updatePending}
                        createPending={createPending}
                        deletePending={deletePending}
                        deleteId={deleteId}
                      />

                    ))
                  }

                </div>

                {/* <Pagination /> */}



                <Pagination align="center" defaultCurrent={currentPage} pageSize={itemPerPage}
                  total={data?.total} onChange={(key) => setCurrentPage(key)}

                />

                <Scroll />



              </div>
              :
              <DataNotFound />

        }

      </div>


      {bulkPending && (
        <div className="absolute  z-50 opacity-90  w-full min-h-full flex justify-center py-5 ">
          <FileUploading file={excelFile} progress={progress} />
        </div>
      )}

      {openFilePopup && (
        <div className="absolute  z-50 opacity-90  w-full min-h-full flex justify-center py-5 ">
          <FileUploadPopup onClose={closeFileBox} filesrc={routeExcelSample}
            onUpload={bulkMutate}
          />
        </div>
      )}


    </div>

  );
}


export default TripHome
























