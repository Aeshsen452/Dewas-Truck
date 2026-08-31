import { createSlice } from "@reduxjs/toolkit";
import { addVehicleAction, uploadVechileExcelFile, deleteVehiclesAction, updateVehiclesAction, getVehicleAction } from "./vehicles.action";



const vehicleSlice = createSlice({
    name: "vehicle",
    initialState: {
        value: [],
        isLoading: false,
        isFileLoading: false,
        uploadProgress: 0,
        file: null,
        Total: 1
    },

    reducers: {
        setUploadProgress: (state, actions) => {
            state.uploadProgress = actions.payload;
        },
        setFile: (state, actions) => {
            state.file = actions.payload;
        }
    },


    extraReducers: (builder) => {

        // add Vehicle Action 

        builder.addCase(addVehicleAction.pending, (state) => {
            state.isLoading = true

        }).addCase(addVehicleAction.fulfilled, (state, actions) => {
            state.isLoading = false;
            const { payload } = actions;
            state.value.unshift(payload);
        }).addCase(addVehicleAction.rejected, (state, actions) => {
            state.isLoading = false;
        })




        // upload VechileExcel File

        builder.addCase(uploadVechileExcelFile.pending, (state) => {
            state.isFileLoading = true,
                state.uploadProgress = 0;
        }).addCase(uploadVechileExcelFile.fulfilled, (state, actions) => {
            state.isFileLoading = false,
                state.uploadProgress = 100;
            state.file = null;
            state.value = [...actions.payload, ...state.value]


        }).addCase(uploadVechileExcelFile.rejected, (state, actions) => {
            state.isFileLoading = false,
                state.uploadProgress = 100;
            state.file = null
        })



        //  delete Vehicles Action 

        builder.addCase(deleteVehiclesAction.pending, (state, actions) => {
            state.isLoading = true

        }).addCase(deleteVehiclesAction.fulfilled, (state, actions) => {
            state.isLoading = false
            const { _id } = actions.payload;
            const filterData = state.value.filter((item) => item._id !== _id);
            state.value = filterData;

        }).addCase(deleteVehiclesAction.rejected, (state, actions) => {
            state.isLoading = false

        })


        // update vehicle 

        builder.addCase(updateVehiclesAction.pending, (state) => {
            state.isLoading = true
        }).addCase(updateVehiclesAction.fulfilled, (state, actions) => {
            state.isLoading = false;
            const { payload } = actions;


            const newData = state.value.map((v) => v._id === payload._id ? payload : v)
            state.value = newData;

        }).addCase(updateVehiclesAction.rejected, (state) => {
            state.isLoading = false
        })



        // fetching data 
        builder.addCase(getVehicleAction.pending, (state) => {
            state.isLoading = true
        }).addCase(getVehicleAction.fulfilled, (state, actions) => {
            state.isLoading = false;
            const { data, Total } = actions.payload;
            state.Total = Total;
            state.value = data;

        }).addCase(getVehicleAction.rejected, () => {
            state.isLoading = false
        })

    }

})

export const { setUploadProgress, setFile } = vehicleSlice.actions;
export default vehicleSlice.reducer;