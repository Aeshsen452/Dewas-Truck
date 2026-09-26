import { useQuery } from "@tanstack/react-query"
import { GetDashApi } from "../apis/DashApis"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useGetDashBoardData = () => {
    const [search, setSearch] = useState("");
    const { calender, selectedDriver } = useSelector((state) => state.dash);
    const [debouceSearch, setDebounceSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 10;


    useEffect(() => {
        const Timer = setTimeout(() => {
            setCurrentPage(1);
            setDebounceSearch(search)
        }, 1000)

        return () => clearTimeout(Timer)
    }, [search])


    const url = (calender || selectedDriver || debouceSearch || currentPage) ? `/dash?driver=${selectedDriver}&&calender=${calender}&&search=${debouceSearch}&&skip=${itemPerPage * (currentPage - 1)}&&limit=${itemPerPage}` : "/dash"

    const { data, isPending, error } = useQuery({
        queryKey: ["dash", selectedDriver, calender, debouceSearch, currentPage],
        queryFn: () => GetDashApi(url),
        staleTime: 50000
    })

    return {
        data,
        isPending,
        error,
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        itemPerPage

    }

}
