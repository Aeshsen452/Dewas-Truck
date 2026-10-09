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

// SALARY SUMMARY 

export const SaveSalaryData = async (payload) => {

    try {
        const { data } = await AxiosInstance.post("/summary", payload);
        return data
    } catch (error) {
        throw error
    }

}

export const GetSalaryData = async (url) => {
    try {
        const { data } = await AxiosInstance.get(url);
        return data
    } catch (error) {
        throw error
    }

}

export const UpdateSalaryData = async (payload) => {
    try {
        const { data } = await AxiosInstance.patch(`/summary`, payload);
        return data
    } catch (error) {
        throw error
    }

}