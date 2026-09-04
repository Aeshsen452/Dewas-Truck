import { AxiosInstance } from "../../../config/axiosInstance";

export const GetVehicleApi = async (url) => {
    try {
        const { data } = await AxiosInstance.get(url);
        return data.data;
    } catch (error) {
        console.log(error)
    }
}

export const addVehicleApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.post("/vehicle", payload);
        return data
    } catch (error) {
        throw error
    }
}

export const updateVehicleApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.patch("/vehicle", payload);
        return data
    } catch (error) {
        throw error
    }
}

export const deleteVehicleApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.delete(`/vehicle/deletevehicle/${payload}`);
        return data
    } catch (error) {
        throw error
    }
}

export const bulkAddVehicle = async (file, setProgress) => {
    try {
        const formData = new FormData();
        formData.append("vehicleExcelFile", file)
        const { data } = await AxiosInstance.post("/vehicle/bulk", formData, {
            onUploadProgress: ({ loaded, total }) => {
                const percentage = Math.round((loaded * 100) / total);
                setProgress(percentage)
            }
        });
        return data
    } catch (error) {
        throw error
    }
}








