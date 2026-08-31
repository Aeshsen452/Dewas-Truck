import { createSlice } from "@reduxjs/toolkit";
import { handleAddAction, handleGetAction, handlDeleteAction, handleUpdateAction } from "./driver.actions";


const driverReducer = createSlice({
    name: "driver",
    initialState: {
        value: [],
        isLoading: false,
    },

    extraReducers: (builder) => {

        // add 
        builder.addCase(handleAddAction.pending, (state) => {
            state.isLoading = true

        }).addCase(handleAddAction.fulfilled, (state, actions) => {
            state.isLoading = false;
            state.value = [actions.payload, ...state.value]

        }).addCase(handleAddAction.rejected, (state, actions) => {
            state.isLoading = false
        })

        // get 
        builder.addCase(handleGetAction.pending, (state) => {
            state.isLoading = true
        }).addCase(handleGetAction.fulfilled, (state, actions) => {
            state.isLoading = false;
            state.value = actions.payload
        }).addCase(handleGetAction.rejected, (state) => {
            state.isLoading = false
        })

        // delete 
        builder.addCase(handlDeleteAction.pending, (state) => {
            state.isLoading = true
        }).addCase(handlDeleteAction.fulfilled, (state, actions) => {
            state.isLoading = false;
            const newData = state.value.filter((item) => item._id !== actions.payload._id);
            state.value = newData
        }).addCase(handlDeleteAction.rejected, (state) => {
            state.isLoading = false
        })

        // update 

        builder.addCase(handleUpdateAction.pending, (state) => {
            state.isLoading = true
        }).addCase(handleUpdateAction.fulfilled, (state, actions) => {
            state.isLoading = false;
            const newData = state.value.map((item) => item._id === actions.payload._id ? actions.payload : item);
            state.value = newData
        }).addCase(handleUpdateAction.rejected, (state) => {
            state.isLoading = false
        })
    }

})


export default driverReducer.reducer