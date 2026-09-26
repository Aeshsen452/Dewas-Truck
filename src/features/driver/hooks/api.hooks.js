import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getDriverApi, createDriverApi, deleteDriverApi, updateDriverApi, bulkAddDriverApi, bulkExportDriverApi } from "../apis/driver.apis"
import { useEffect, useState } from "react";

export const useGetDriver = () => {
    const [search, setSearch] = useState("");
    const [bouce, setDebounce] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 21;


    useEffect(() => {
        let Timer = setTimeout(() => {
            setCurrentPage(1);
            setDebounce(search)
        }, 1000)

        return () => clearTimeout(Timer)

    }, [search])


    const url = bouce.trim() || currentPage ? `/driver?search=${bouce}&&skip=${itemPerPage * (currentPage - 1)}&&limit=${itemPerPage}` : `/driver`;

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["driver", bouce, currentPage],
        queryFn: () => getDriverApi(url),
        staleTime: 50000
    })

    return {
        data,
        isPending,
        isError,
        error,
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        itemPerPage
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

export const useBulkExport = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: bulkExportDriverApi,
        onSuccess: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "drivers.xlsx";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Excel file downloaded successfully!")
        },
        onError: (error) => {
            toast.error(error.response?.data.message || "Failed to downold excel file");
        }
    })
    return {
        ExportData: mutate,
        ExportPending: isPending,
    }
}