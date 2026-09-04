import { AxiosInstance } from "../../../config/axiosInstance";

export const addRouteApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.post("/route", payload);
        return data

    } catch (error) {
        throw error
    }
}


export const getRoutesApi = async (api) => {
    try {
        const { data } = await AxiosInstance.get(api);
        return data.data;
    } catch (error) {
        throw error
    }
}



export const deleteRouteApi = async (id) => {
    try {
        const { data } = await AxiosInstance.delete(`/route/${id}`);
        return data
    } catch (error) {
        throw error
    }
}



export const editRouteApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.patch(`/route`, payload);
        return data;
    } catch (error) {
        throw error
    }
}

export const bullAddRouteApi = async (File, setprogress) => {
    try {
        const formData = new FormData();
        formData.append("ExcelFile", File);

        const { data } = await AxiosInstance.post("/route/bulk", formData, {
            onUploadProgress: ({ loaded, total }) => {
                const per = Math.round(loaded * 100 / total);
                setprogress(per)
            }
        })
        return data

    } catch (error) {
        throw error
    }
}