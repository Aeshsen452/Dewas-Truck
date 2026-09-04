import { AxiosInstance } from "../../../config/axiosInstance"
import { toast } from "react-toastify";

export const getDriverApi = async (apiEndPoint) => {
    try {
        console.log("fetching get apis")
        const { data } = await AxiosInstance.get(apiEndPoint);
        return data.data
    } catch (error) {
        console.log(error)
    }
}


export const createDriverApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.post("/driver", payload);
        toast.success(data.message);
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong ");
    }
}


export const updateDriverApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.patch("/driver", payload);
        toast.success(data.message);
        return data.data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}


export const deleteDriverApi = async (Id) => {
    try {
        const { data } = await AxiosInstance.delete(`/driver/${Id}`);
        toast.success(data.message);
        return data.data;

    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong ");
    }
}


export const bulkAddDriverApi = async ({ file, onProgress }) => {
    try {
        const formData = new FormData();
        formData.append("driverExcelFile", file);

        const { data } = await AxiosInstance.post(
            "/driver/bulk",
            formData,
            {
                onUploadProgress: ({ loaded, total }) => {
                    if (!total) return;

                    const percentage = Math.round((loaded * 100) / total);

                    onProgress?.(percentage);
                }
            }
        );

        toast.success(data?.message);

        return data.data;
    } catch (error) {
        toast.error(
            error?.response?.data?.message || "Something went wrong"
        );

        throw error;
    }
};
