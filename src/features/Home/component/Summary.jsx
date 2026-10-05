import { useState } from "react";
import useCommonHook from "../hooks/Common.hook";

const Summary = ({data}) => {

   let rps = 0;
   let TotalSalary = 0;

   data.forEach((item)=>{
     item.routes.forEach((d)=>{
        TotalSalary+=d.TotalSalary;
        rps+=d.TotalTrip
     })
   })

      const {register,isOpen, handleSubmit,handleFormSubmit,Deducteddata} = useCommonHook();
    
  return (
   <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                <h3 className="font-semibold text-gray-900">
                                    Salary Summary
                                </h3>

                                <div className="mt-6 space-y-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Gross Salary
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            ₹{TotalSalary}
                                        </span>
                                    </div>

                              

                                            <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Total Trip
                                        </span>
                                        <span className="font-semibold">
                                            {rps}
                                        </span>
                                    </div>


<form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-y-2">   


                              {/* Extra Duites          */}

                              
                                            <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Extra Duty
                                        </span>
                                        <input
                                          {...register("extraDuty")}
                                         className="w-32 font-semibold outline-none border border-gray-300 rounded-md py-1 px-2" type="number" />
                                    </div>


                                       {/* extra diesel amount */}


                                    
                                            <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Extra Diesel Amount
                                        </span>
                                        <input
                                          {...register("extraDiesel")}
                                         className="w-32 font-semibold outline-none border border-gray-300 rounded-md py-1 px-2" type="number" />
                                    </div>


                            {/* Pf */}

                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                           PF Amount
                                        </span>
                                        <input
                                         {...register("pf")}
                                        className="w-32 font-semibold outline-none border border-gray-300 rounded-md py-1 px-2" type="number" />
                                    </div>


                                    {/* Esic  */}

                                     <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                           ESIC Amount
                                        </span>
                                        <input
                                        {...register("esic")}
                                         className="w-32 font-semibold outline-none border border-gray-300 rounded-md py-1 px-2" type="number" />
                                    </div>

                                    {/* Advanced  */}

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                           Advanced Amount
                                        </span>
                                         <input 
                                         {...register("advanced")}
                                         className="w-32 font-semibold outline-none border border-gray-300 rounded-md py-1 px-2" type="number" />
                                    </div>


{
    !isOpen  ?

     <div className="flex justify-end items-center p-3">
                               <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 cursor-pointer" type="submit"> Save </button>
                                     </div>


    :

           <div className="border-t border-gray-100 pt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">
                                                Net Salary
                                            </span>
                                            <span className="text-xl font-bold text-green-600">
                                                ₹
                                               {
                                                Number(newData.Salary)+ Number(Deducteddata.extraDuty || 0)-Number(Deducteddata.advanced ||0)-Number(Deducteddata.esic || 0)-Number(Deducteddata.extraDiesel || 0)-Number(Deducteddata.pf||0)
                                               }
                                            </span>
                                        </div>
                                    </div>


}


                                    
                                     
</form>
                             

                                   
                                </div>
                            </div>
  )
}

export default Summary


























// const Graph = () => {
//   return (
//       <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
//                             <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
//                                 <div className="mb-6">
//                                     <h3 className="font-semibold text-gray-900">
//                                         Monthly Trips
//                                     </h3>
//                                     <p className="mt-1 text-sm text-gray-500">
//                                         Trip performance for {selectedDriver.name}
//                                     </p>
//                                 </div>

//                                 {/* Simple Bar Chart */}
//                                 <div className="flex h-64 items-end justify-between gap-3 border-b border-gray-100 px-2">
//                                     {tripData.map((item) => {
//                                         const height = (item.trips / maxTrips) * 100;

//                                         return (
//                                             <div
//                                                 key={item.month}
//                                                 className="flex h-full flex-1 flex-col items-center justify-end gap-2"
//                                             >
//                                                 <span className="text-xs font-medium text-gray-500">
//                                                     {item.trips}
//                                                 </span>

//                                                 <div
//                                                     className="w-full max-w-10 rounded-t-lg bg-blue-500 transition-all duration-500 hover:bg-blue-600"
//                                                     style={{ height: `${height}%` }}
//                                                 />

//                                                 <span className="text-xs text-gray-400">
//                                                     {item.month}
//                                                 </span>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>

//                             {/* Salary Details */}
                            
//                         </div>
//   )
// }

// export default Graph