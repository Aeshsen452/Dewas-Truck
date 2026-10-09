import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetDashApi, GetDriverApi, SaveSalaryData, GetSalaryData, UpdateSalaryData } from "../apis/DashApis"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useGetDashBoardData = () => {
    const [search, setSearch] = useState("");
    const { calender, selectedDriver } = useSelector((state) => state.dash);
    const [debouceSearch, setDebounceSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 5;


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

export const useGetDriverData = () => {
    return useQuery({
        queryKey: ["driver"],
        queryFn: GetDriverApi,
        staleTime: 50000

    });

}

export const useGetSalarySumery = () => {
    const { calender, selectedDriver } = useSelector((state) => state.dash);
    const url = `/summary?driverName=${selectedDriver}&&Calender=${calender}`

    const { data, isPending, isError } = useQuery({
        queryKey: ["Salarykey", calender, selectedDriver],
        queryFn: () => GetSalaryData(url)
    })
    return { SalaryData: data, SalaryPending: isPending }
}

export const useSaveSalaryData = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: SaveSalaryData,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["Salarykey"]
            });
            toast.success(data?.message || "Submitted");

        },
        onError: (error) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong saving ");
        }
    });
    return {
        CreateSalaryFn: mutate,
        createSalaryPending: isPending,
        createSalaryError: isError
    }
}

export const useUpdateSalary = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: UpdateSalaryData,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["Salarykey"]
            });
            toast.success(data?.message || "updated successfully")
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong ")
        }
    });

    return {
        updateMutate: mutate,
        updatePending: isPending,
        updateError: isError
    }

}
