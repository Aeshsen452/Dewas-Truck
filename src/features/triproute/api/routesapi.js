import { AxiosInstance } from "../../../config/axiosInstance";

export const addRouteApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.post("/route", payload);
        return data

    } catch (error) {
        return error.response.data.message || "Something went wrong"
    }
}


export const getRoutesApi = async () => {
    try {
        const { data } = await AxiosInstance.get("/route");
        return data;

    } catch (error) {
        return error.response.data.message || "Something went wrong"
    }
}



export const deleteRouteApi = async (id) => {
    try {
        const { data } = await AxiosInstance.delete(`/route/${id}`);
        return data
    } catch (error) {
        return error.response.data.message || "Something went wrong"
    }
}



export const editRouteApi = async (payload) => {
    try {
        const { data } = await AxiosInstance.patch(`/route`, payload);
        return data;
    } catch (error) {
        return error.response.data.message || "Something went wrong"
    }
}