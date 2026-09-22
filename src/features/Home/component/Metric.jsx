


const SalarySummary = ({ data }) => {

  const { rps, TripAmount, Early, IncentiveAmount, Late, refund, Salary_Deducted, Diesel } = data

  const rpsTotal = rps * TripAmount;
  const incentiveTotal = Early * IncentiveAmount;
  const penaltyTotal = Salary_Deducted;

  const totalSalary =
    rpsTotal + incentiveTotal - penaltyTotal + refund;



  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-flex items-center gap-3 whitespace-nowrap
                      px-3 py-2 rounded-lg  
                      text-sm shadow-sm">

        {/* RPS */}
        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold">Rps</span>
          <span>{rps}</span>

        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold"> Amount</span>
          <span>₹{TripAmount}</span>

        </div>

        <span>=</span>

        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold"> Total</span>
          <span className="font-semibold text-blue-600">
            ₹{rpsTotal}
          </span>

        </div>


        <span className="text-gray-300">|</span>


        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold">On Time </span>
          <span>{Early}</span>

        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold"> Amount</span>
          <span>₹{IncentiveAmount}</span>

        </div>

        <span>=</span>

        <div className="flex flex-col items-center justify-center  text-green-600">
          <span className="font-semibold">Total</span>
          <span className="font-semibold ">
            ₹{incentiveTotal}
          </span>

        </div>


        <span className="text-gray-300">|</span>

        {/* Late */}

        <div className="flex flex-col items-center justify-center text-red-600 ">
          <span className="font-semibold">Late Rps </span>
          <span>{Late}</span>

        </div>



        <div className="flex flex-col items-center justify-center text-red-600">
          <span className="font-semibold">Total</span>
          <span className="font-semibold ">
            ₹{penaltyTotal}
          </span>

        </div>

        <span className="text-gray-300">|</span>

        {/* Refund */}

        <div className="flex flex-col items-center justify-center text-orange-400">
          <span className="font-semibold">Refund</span>
          <span className="font-semibold ">
            ₹{refund}
          </span>

        </div>




        <span className="text-gray-300">|</span>


        {/* Salary */}

        <div className="flex flex-col items-center justify-center text-orange-400">
          <span className="font-semibold">Total Salary</span>
          <span className="font-semibold ">
            ₹{totalSalary.toLocaleString("en-IN")}
          </span>

        </div>
        <span className="text-gray-300">|</span>
        <div className="flex flex-col items-center justify-center ">
          <span className="font-semibold"> Diesel</span>
          <span className="font-semibold ">
            {Diesel}
          </span>

        </div>




      </div>
    </div>
  );
};

export default SalarySummary;



