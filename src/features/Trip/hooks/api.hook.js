import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTripApi, addTripApi, deleteTripApi, updateTripApi, bulkTripApi } from "../api/trip.api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const useGetTrip = () => {
    const [search, setSearch] = useState("")
    const [debounce, setDebounce] = useState("");

    useEffect(() => {
        let Timer = setTimeout(() => {
            setDebounce(search)
        }, 1000)

        return () => clearTimeout(Timer)
    }, [search])

    const url = debounce.trim() ? `/trip?search=${debounce}` : `/trip`
    const { data, isPending, error } = useQuery({
        queryKey: ["trip", debounce],
        queryFn: () => getTripApi(url),
        staleTime: 50000
    })

    return {
        data, isPending, error, search, setSearch
    }

}

export const useAddTrip = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: addTripApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["trip"]
            })
        },
        onError: (error) => {
            toast.error(error?.response?.data.message || "Something went wrong");
        }
    })

    return {
        createMutate: mutate,
        createPending: isPending
    }
}

export const useDeletTrip = () => {
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState(null);

    const { mutate, isPending } = useMutation({
        mutationFn: deleteTripApi,
        onMutate: (id) => setDeleteId(id),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["trip"]
            })
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "something went wrong");
        },
        onSettled: () => setDeleteId(null)
    })

    return {
        deleteMutate: mutate,
        deletePending: isPending,
        deleteId
    }


}

export const useUpdateTrip = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateTripApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["trip"]
            })
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "something went wrong")
        }
    })

    return {
        updateMutate: mutate,
        updatePending: isPending
    }
}

export const useBulkAddTrip = () => {
    const queryClient = useQueryClient();
    const [progress, setProgress] = useState(0);
    const [excelFile, setExcelFile] = useState(null);

    const { mutate, isPending, error } = useMutation({
        mutationFn: (file) => bulkTripApi(file, setProgress),
        onMutate: (file) => setExcelFile(file),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["trip"]
            })
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "something went wrong");
        },
        onSettled: () => {
            setExcelFile(null);
            setProgress(0)
        }
    })

    return {
        bulkAddTrip: mutate,
        bulkPending: isPending,
        bulkError: error,
        progress,
        excelFile,
    }

}