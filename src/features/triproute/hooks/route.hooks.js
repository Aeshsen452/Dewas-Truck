import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getRoutesApi, addRouteApi, deleteRouteApi, editRouteApi, bullAddRouteApi } from "../api/routesapi"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export const useGetRoute = () => {
    const [search, setSearch] = useState("");
    const [debounce, setDebounce] = useState("");

    useEffect(() => {
        let Timer = setTimeout(() => {
            setDebounce(search)
        }, 1000)
        return () => clearTimeout(Timer)
    }, [search])

    const url = debounce.trim() ? `/route?search=${debounce}` : `/route`
    const { data, isPending, error } = useQuery({
        queryKey: ["route", debounce],
        queryFn: () => getRoutesApi(url),
        staleTime: 50000
    })

    return {
        data, isPending, error, search, setSearch
    }

}


export const useAddRoute = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: addRouteApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["route"]
            })

        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    })

    return {
        createMutate: mutate,
        createPending: isPending
    }

}

export const useDeleteRoute = () => {
    const queryClient = useQueryClient();

    const [deleteId, setDeleteId] = useState(null)

    const { mutate, isPending } = useMutation({
        mutationFn: deleteRouteApi,
        onMutate: (id) => setDeleteId(id),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["route"]
            })

        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        },
        onSettled: () => setDeleteId(null)
    })

    return {
        deleteMutate: mutate,
        deletePending: isPending,
        deleteId
    }
}

export const useUpdateRoute = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: editRouteApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["route"]
            })

        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    })

    return {
        updateMutate: mutate,
        updatePending: isPending
    }
}

export const useBulkAddRoute = () => {
    const [progress, setprogress] = useState(0);
    const [excelFile, setExcelFile] = useState(null);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (file) => bullAddRouteApi(file, setprogress),
        onMutate: (file) => setExcelFile(file),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["route"]
            })
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        },
        onSettled: () => {
            setExcelFile(null);
            setprogress(0);
        }
    })

    return {
        bulkMutate: mutate,
        bulkPending: isPending,
        excelFile,
        progress
    }
}