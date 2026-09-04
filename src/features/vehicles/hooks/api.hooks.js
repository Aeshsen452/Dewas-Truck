import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetVehicleApi, deleteVehicleApi, addVehicleApi, updateVehicleApi, bulkAddVehicle } from "../apis/api"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetVehicle = () => {
    const [search, setSearch] = useState("");
    const [deboucing, setDebouncing] = useState("");

    useEffect(() => {

        const Timmer = setTimeout(() => {
            setDebouncing(search)
        }, 1000);

        return () => clearTimeout(Timmer)

    }, [search])

    const url = deboucing.trim() ? `/vehicle?search=${deboucing}` : `/vehicle`

    const { data, isPending, error } = useQuery({
        queryKey: ['vehicles', deboucing],
        queryFn: () => GetVehicleApi(url),
        staleTime: 50000
    });

    return {
        data, isPending, error, search, setSearch
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