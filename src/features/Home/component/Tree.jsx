import Metric from "./Metric";

const DriverTree = ({data}) => {
  const vehicleNumber = data.key;
  
  const routeData = Object.entries(data.data).map(([route, values]) => ({
    route,
    ...values
  }));



  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* VEHICLE */}
      <div className="flex items-center gap-4">

        <div className="flex h-12 min-w-[120px] items-center justify-center rounded-xl bg-blue-50 px-4">
          <span className="font-bold text-blue-700">
            {vehicleNumber}
          </span>
        </div>

        <div className="h-px flex-1 bg-slate-200" />
      </div>


      {/* ROUTES */}
      <div className="relative ml-6 mt-5 border-l-2 border-slate-200 pl-7">

        {routeData.map((route, index) => (

          <div
            key={index}
            className="relative mb-6 last:mb-0"
          >

            {/* Tree connector */}
            <div className="absolute -left-[31px] top-5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-50" />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

              {/* ROUTE NAME */}
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {route.route}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Route {index + 1}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {route.rps} RPS
                </span>

              </div>


              {/* ROUTE TREE */}
              <div className="relative mt-4 ml-3 border-l border-slate-300 pl-5 grid grid-cols-4 gap-5">



                {/* SALARY */}
                <Metric
                  color="green"
                  label="Salary"
                  value={`₹${route.Salary}`}
                />

                {/* DEDUCTED */}
                <Metric
                  color="red"
                  label="Salary Deducted"
                  value={`₹${route.Salary_Deducted}`}
                />

                {/* ON TIME */}
                <Metric
                  color="emerald"
                  label="On Time"
                  value={route.On_Time}
                />

                {/* LATE */}
                <Metric
                  color="orange"
                  label="Late"
                  value={route.Late}
                />

              </div>

            </div>
          </div>

        ))}

      </div>
    </div>
  );
};

export default DriverTree