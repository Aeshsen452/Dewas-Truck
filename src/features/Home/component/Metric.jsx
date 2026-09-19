
const Metric = ({ labelName1, labelName2, value1, value2 }) => {
  const total = value1 * value2;

  return (
    <div className="flex items-center justify-center gap-2 rounded-xl text-xs bg-white p-5 shadow-sm">

      {/* Total RPS */}
      <div className="text-center flex flex-col gap-y-1">
        <p className="text-sm text-gray-500">{labelName1}</p>
        <p className=" font-bold text-gray-800">
          {value1}
        </p>
      </div>

      {/* Multiply */}
      <div className="font-bold text-gray-400">
        ×
      </div>

      {/* Trip Salary */}
      <div className="text-center flex flex-col gap-y-1">
        <p className="text-sm text-gray-500">{labelName2}</p>
        <p className=" font-bold text-gray-800">
          ₹{value2}
        </p>
      </div>

      {/* Equal */}
      <div className=" font-bold text-gray-400">
        =
      </div>

      {/* Total */}
      <div className="text-center flex flex-col gap-y-1">
        <p className="text-sm text-gray-500">Total</p>
        <p className=" font-bold text-green-600">
          ₹{total}
        </p>
      </div>

    </div>
  );
};

export default Metric;