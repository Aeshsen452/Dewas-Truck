import { AxiosInstance } from "../../../config/axiosInstance";


export const getTripApi = async (url) => {
    try {
        const { data } = await AxiosInstance.get(url);
        console.log("getting trip api is fetching")
        return data.data
    } catch (error) {
        throw error
    }
}

export const addTripApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.post("/trip", payload);
        return data;
    } catch (error) {
        throw error
    }
}

export const deleteTripApi = async (Id) => {
    try {
        const { data } = await AxiosInstance.delete(`/trip/${Id}`);
        return data
    } catch (error) {
        throw error
    }
}

export const updateTripApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.patch("/trip", payload);
        return data;
    } catch (error) {
        throw error
    }
}

export const bulkTripApi = async (file, setprogress) => {
    try {
        const formData = new FormData();
        formData.append("ExcelFile", file)
        const { data } = await AxiosInstance.post("/trip/bulk", formData, {
            onUploadProgress: ({ loaded, total }) => {
                const per = Math.round(loaded * 100 / total);
                setprogress(per)
            }
        });
        return data
    } catch (error) {
        throw error
    }
}

