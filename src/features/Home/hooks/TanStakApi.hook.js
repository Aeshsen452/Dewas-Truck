import { useQuery } from "@tanstack/react-query"
import { GetDashApi } from "../apis/DashApis"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useGetDashBoardData = () => {
    const [search, setSearch] = useState("");
    const { calender, selectedDriver } = useSelector((state) => state.dash);
    const [debouceSearch, setDebounceSearch] = useState("");


    useEffect(() => {
        const Timer = setTimeout(() => {
            setDebounceSearch(search)
        }, 1000)

        return () => clearTimeout(Timer)
    }, [search])

    useEffect(() => {

    }, [])




    const url = (calender || selectedDriver || debouceSearch) ? `/dash?driver=${selectedDriver}&calender=${calender}&search=${debouceSearch}` : "/dash"

    const { data, isPending, error } = useQuery({
        queryKey: ["dash", selectedDriver, calender, debouceSearch],
        queryFn: () => GetDashApi(url),
        staleTime: 50000
    })

    return {
        data,
        isPending,
        error,
        search,
        setSearch

    }

}
