import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../../config/axiosInstance"
import { toast } from "react-toastify";
import { setUploadProgress } from "./vehiclestate";



export const addVehicleAction = createAsyncThunk("vehicle/add", async (payload) => {
    try {
        const { data } = await AxiosInstance.post("/vehicle", payload);
        toast.success(data.message);
        return data.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");

    }

})


export const uploadVechileExcelFile = createAsyncThunk("vehicle/importexcelfile", async (payload, thunkAPI) => {
    try {

        const { data } = await AxiosInstance.post("/vehicle/excelfile", payload, {
            onUploadProgress: (progressEvent) => {

                const total = progressEvent.total;

                if (total) {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / total
                    );

                    thunkAPI.dispatch(
                        setUploadProgress(progress)
                    );
                }
            }
        })

        toast.success(data?.message || "File Extracted successfully");
        return data.data

    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
    }

})


export const deleteVehiclesAction = createAsyncThunk("vehicle/delete", async (payload) => {
    try {

        console.log("idasfsad", payload)
        const { data } = await AxiosInstance.delete(`/vehicle/deletevehicle/${payload}`);
        toast.success(data.message);
        return data.data;

    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
    }
})


export const updateVehiclesAction = createAsyncThunk("/vehicles/update", async (payload) => {
    try {
        const { data } = await AxiosInstance.patch("/vehicle", payload);

        toast.success(data.message);
        return data.data;

    } catch (error) {
        toast.error(error?.response?.data?.message || "something went wrong");
    }
})


export const getVehicleAction = createAsyncThunk("/vehicle/get", async (url) => {
    try {
        const { data } = await AxiosInstance.get(url);
        return data;

    } catch (error) {
        console.log("error")
    }
})






