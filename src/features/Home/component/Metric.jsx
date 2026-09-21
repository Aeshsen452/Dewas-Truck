


const SalarySummary = ({ data }) => {

  const { rps, TripAmount, Early, IncentiveAmount, LateAmount, Late, refund, Salary_Deducted } = data

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

        <div className="flex flex-col items-center justify-center ">
          <span className="font-semibold">Late </span>
          <span>{Late}</span>

        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold">Amount</span>
          <span>₹{LateAmount}</span>

        </div>

        <span>=</span>

        <div className="flex flex-col items-center justify-center text-red-600">
          <span className="font-semibold">Total</span>
          <span className="font-semibold ">
            ₹{penaltyTotal}
          </span>

        </div>



        <span className="text-gray-300">|</span>

        {/* Refund */}
        <span>
          <b>Refund:</b>{" "}
          <span className="text-orange-500 font-semibold">
            ₹{refund}
          </span>
        </span>

        <span>=</span>

        {/* Salary */}
        <span className="font-bold text-gray-900">
          Salary: ₹{totalSalary.toLocaleString("en-IN")}
        </span>

      </div>
    </div>
  );
};

export default SalarySummary;



