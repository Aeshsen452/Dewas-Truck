import { CalendarDays } from "lucide-react";
import { useRef, useState } from "react";
import { handleMonthYear } from "../../../utils/FormatYearMonth";
import { SelectingCalender } from "../state/dash.Slice";
import { useDispatch, useSelector } from "react-redux";

const MonthCalender = () => {
    const calenderRef = useRef(null);
    const dispatch = useDispatch();
    const { calender } = useSelector((state) => state.dash);

    const handleClick = () => {
        calenderRef.current?.showPicker();
    };

    return (
        <div className="relative flex w-full items-center justify-end gap-2 pr-10 text-sm text-gray-600">

            <CalendarDays
                className="h-4 w-4 cursor-pointer hover:text-blue-600"
                onClick={handleClick}
            />

            <span>
                {handleMonthYear(calender) || "Select Month"}
            </span>

            {/* Invisible but NOT hidden */}
            <input
                ref={calenderRef}
                type="month"
                value={calender}
                onChange={(e) => dispatch(SelectingCalender(e.target.value))}
                className="pointer-events-none absolute right-5 top-5 h-1 w-1 opacity-0"
            />
        </div>
    );
};

export default MonthCalender;