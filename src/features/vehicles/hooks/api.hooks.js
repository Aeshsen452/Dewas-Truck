import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetVehicleApi, deleteVehicleApi, addVehicleApi, updateVehicleApi, bulkAddVehicle, bulkGetVehicles } from "../apis/api"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetVehicle = () => {
    const [search, setSearch] = useState("");
    const [deboucing, setDebouncing] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 20;

    useEffect(() => {

        const Timmer = setTimeout(() => {
            setCurrentPage(1);
            setDebouncing(search);
        }, 1000);

        return () => clearTimeout(Timmer)

    }, [search])

    const url = deboucing.trim() || currentPage ? `/vehicle?search=${deboucing}&&skip=${itemPerPage * (currentPage - 1)}&&limit=${itemPerPage}` : `/vehicle`


    const { data, isPending, error } = useQuery({
        queryKey: ['vehicles', deboucing, currentPage],
        queryFn: () => GetVehicleApi(url),
        staleTime: 50000
    });

    return {
        data,
        isPending, error,
        search, setSearch,
        currentPage,
        setCurrentPage,
        itemPerPage,
        itemPerPage
    }
}

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState(null)

    const { mutate, isPending } = useMutation({
        mutationFn: deleteVehicleApi,
        onMutate: (Id) => {
            setDeleteId(Id)
        },

        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey: ["vehicles"],
            });
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Something went wrong")
        },

        onSettled: () => {
            setDeleteId(null)
        }

    });

    return {
        deleteMutate: mutate,
        deletePending: isPending,
        deleteId
    };
};


export const useAddVehicles = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: addVehicleApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["vehicles"]
            })
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    })
    return {
        createMutate: mutate,
        createPending: isPending
    }


}

export const useUpdateVehicles = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: updateVehicleApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["vehicles"]
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

export const useBulkAddVehicles = () => {
    const queryClient = useQueryClient();
    const [progress, setProgress] = useState(0);
    const [excelFile, setFiles] = useState(null);

    const { mutate, isPending } = useMutation({
        mutationFn: (file) => bulkAddVehicle(file, setProgress),
        onMutate: (file) => {
            setFiles(file)
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["vehicles"]
            })
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong ");
        },
        onSettled: () => {
            setProgress(0);
            setFiles(null)
        }

    })

    return {
        bulkMutate: mutate,
        bulkPending: isPending,
        excelFile,
        progress
    }

}

export const useBulkVehicles = () => {
    const { mutate, isPending, error } = useMutation({
        mutationFn: bulkGetVehicles,
        onSuccess: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "vehicles.xlsx";
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
        ExportError: error
    }

}