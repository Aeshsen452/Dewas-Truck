import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../../config/axiosInstance";
import { toast } from "react-toastify";

// hitting drivers get api 
export const handleDriverNames = createAsyncThunk("/drivername", async () => {
    try {
        const { data } = await AxiosInstance.get("/driver");
        return data.data;

    } catch (error) {
        console.log("error")
    }
});

// hitting routes get api 
export const handleRoutes = createAsyncThunk("/routes", async () => {
    try {
        const { data } = await AxiosInstance.get("/route");
        return data.data;

    } catch (error) {
        console.log("error")
    }
});

// hitting vehicles get api 
export const handleVehicleNumber = createAsyncThunk("/vehicles", async () => {
    try {
        const { data } = await AxiosInstance.get("/vehicle");
        return data.data;

    } catch (error) {
        console.log("error")
    }

});


// adding Trip 

export const handleAddTripAction = createAsyncThunk("/trip/add", async (payload) => {

    try {
        const { data } = await AxiosInstance.post("/trip", payload);
        toast.success(data.message);
        return data.data;

    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong")
    }

})

// getting all Trip 
export const handleGetTripAction = createAsyncThunk("/trip/get", async () => {
    try {
        const { data } = await AxiosInstance.get("/trip");
        return data.data;
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong")
    }

})