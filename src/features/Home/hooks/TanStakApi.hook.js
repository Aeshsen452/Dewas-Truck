import { useQuery } from "@tanstack/react-query"
import { GetDashApi } from "../apis/DashApis"
import { useState } from "react";
import { useSelector } from "react-redux";

export const useGetDashBoardData = () => {

    const { calender, selectedDriver } = useSelector((state) => state.dash)

    const url = (calender || selectedDriver) ? `/dash?driver=${selectedDriver}&calender=${calender}` : "/dash"



    const { data, isPending, error } = useQuery({
        queryKey: ["dash", selectedDriver, calender],
        queryFn: () => GetDashApi(url),
        staleTime: 50000
    })

    return {
        data,
        isPending,
        error,
    }

}
