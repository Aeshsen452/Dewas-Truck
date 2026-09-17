

const Summary = () => {

    const selectedDriver ={
        salary:5000,
        deducted:200,
        rps:10


    }
  return (
   <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900">
                                    Salary Summary
                                </h3>

                                <div className="mt-6 space-y-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Gross Salary
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            ₹{selectedDriver.salary.toLocaleString("en-IN")}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Deduction
                                        </span>
                                        <span className="font-semibold text-red-500">
                                            - ₹{selectedDriver.deducted.toLocaleString("en-IN")}
                                        </span>
                                    </div>

                                            <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Total Trip
                                        </span>
                                        <span className="font-semibold">
                                            {selectedDriver.rps}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-100 pt-5">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-700">
                                                Net Salary
                                            </span>
                                            <span className="text-xl font-bold text-green-600">
                                                ₹
                                                {(
                                                    selectedDriver.salary - selectedDriver.deducted
                                                ).toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    </div>

                                   
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