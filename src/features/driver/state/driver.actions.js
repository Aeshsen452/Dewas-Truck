import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../../config/axiosInstance"
import { toast } from "react-toastify";


export const handleAddAction = createAsyncThunk("/driver/add", async (payload) => {
    try {
        const { data } = await AxiosInstance.post("/driver", payload);
        toast.success(data.message);
        return data.data;

    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong ");
    }
}

)


export const handlDeleteAction = createAsyncThunk("/driver/delete", async (Id) => {
    try {
        const { data } = await AxiosInstance.delete(`/driver/${Id}`);
        toast.success(data.message);
        return data.data;

    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong ");
    }
}

)


export const handleGetAction = createAsyncThunk("/driver/get", async () => {
    try {
        const { data } = await AxiosInstance.get("/driver");
        return data.data
    } catch (error) {
        toast.error(error.response.data.message)
    }

})

export const handleUpdateAction = createAsyncThunk("/driver/update", async (payload) => {
    try {

        const { data } = await AxiosInstance.patch("/driver", payload);
        toast.success(data.message);
        return data.data
    } catch (error) {
        toast.error(error.response.data.message)
    }
})