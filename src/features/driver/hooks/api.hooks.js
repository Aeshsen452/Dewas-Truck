import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getDriverApi, createDriverApi, deleteDriverApi, updateDriverApi, bulkAddDriverApi } from "../apis/driver.apis"
import { useEffect, useState } from "react";

export const useGetDriver = () => {
    const [search, setSearch] = useState("");
    const [bouce, setDebounce] = useState("")


    useEffect(() => {
        let Timer = setTimeout(() => {
            setDebounce(search)
        }, 1000)

        return () => clearTimeout(Timer)

    }, [search])


    const url = bouce.trim() ? `/driver?search=${bouce}` : `/driver`;

    const { data, isPending, isError } = useQuery({
        queryKey: ["driver", bouce],
        queryFn: () => getDriverApi(url),
        staleTime: 50000
    })

    return {
        data,
        isPending,
        isError,
        search,
        setSearch
    }

}

export const useAddDriver = () => {
    const queryClient = useQueryClient();
    const {
        mutate,
        isPending,
        error,
        data,
    } = useMutation({
        mutationFn: createDriverApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["driver"],
            });
        },
    });

    return {
        CreateMuate: mutate,
        createPending: isPending,
    };
};

export const useDeleteDriver = () => {
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState(null)
    const {
        mutate,
        isPending,
    } = useMutation({
        mutationFn: deleteDriverApi,
        onMutate: (id) => {
            setDeleteId(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["driver"],
            });
        },
        onSettled: () => {
            setDeleteId(null)
        }
    });

    return {
        deleteMuate: mutate,
        deletePending: isPending,
        deleteId
    };
}


export const useUpdateDriver = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: updateDriverApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["driver"]
            });

        },

    })

    return {
        updateMutate: mutate,
        updatePending: isPending
    }
}


export const useBulkAddDriver = () => {
    const queryClient = useQueryClient();
    const [progress, setProgress] = useState(0);
    const [excelFile, setExcelFile] = useState(null)

    const mutation = useMutation({
        mutationFn: ({ file }) => {
            setExcelFile(file);
            setProgress(0);
            return bulkAddDriverApi({
                file,
                onProgress: setProgress,
            })
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["driver"],
            });

            setProgress(100);
            setExcelFile(null)
        },

        onError: () => {
            setProgress(0);
            setExcelFile(null)
        },
    });

    return {
        ...mutation,
        progress,
        excelFile
    };
};