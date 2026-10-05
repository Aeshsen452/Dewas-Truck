import { AxiosInstance } from "../../../config/axiosInstance";

export const GetDashApi = async (url) => {
    try {
        const { data } = await AxiosInstance.get(url);
        return data
    } catch (error) {
        throw error
    }

}

export const GetDriverApi = async () => {
    try {
        const { data } = await AxiosInstance.get("/dash/driver");
        return data
    } catch (error) {
        throw error
    }
}