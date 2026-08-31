import { createSlice } from "@reduxjs/toolkit";
import { handleDriverNames, handleRoutes, handleVehicleNumber, handleAddTripAction, handleGetTripAction } from './trip.actions'


const TripReducer = createSlice({
    name: "Trip",
    initialState: {
        value: [],
        driverNames: [],
        vehicleNumbers: [],
        Routes: [],
        isLoading: false,
        fetchDataLoader: false

    },
    extraReducers: (builder) => {

        // updating Driver names state 
        builder.addCase(handleDriverNames.pending, (state) => {
            state.fetchDataLoader = true
        }).addCase(handleDriverNames.fulfilled, (state, actions) => {
            state.fetchDataLoader = false
            state.driverNames = actions.payload

        }).addCase(handleDriverNames.rejected, (state) => {
            state.fetchDataLoader = false
        })

        // updating routes state 
        builder.addCase(handleRoutes.pending, (state) => {
            state.fetchDataLoader = true
        }).addCase(handleRoutes.fulfilled, (state, actions) => {
            state.fetchDataLoader = false;
            state.Routes = actions.payload

        }).addCase(handleRoutes.rejected, (state) => {
            state.fetchDataLoader = false;
        })

        // updating vehicles state 

        builder.addCase(handleVehicleNumber.pending, (state) => {
            state.fetchDataLoader = true
        }).addCase(handleVehicleNumber.fulfilled, (state, actions) => {
            state.fetchDataLoader = false
            state.vehicleNumbers = actions.payload
        }).addCase(handleVehicleNumber.rejected, (state) => {
            state.fetchDataLoader = false
        })


        // adding trip 
        builder.addCase(handleAddTripAction.pending, (state, actions) => {
            state.isLoading = true;

        }).addCase(handleAddTripAction.fulfilled, (state, actions) => {
            state.isLoading = false;

            state.value = [actions.payload, ...state.value];
        }).addCase(handleAddTripAction.rejected, (state, actions) => {
            state.isLoading = false
        })


        // getting trip 
        builder.addCase(handleGetTripAction.pending, (state, actions) => {
            state.isLoading = true;

        }).addCase(handleGetTripAction.fulfilled, (state, actions) => {
            state.isLoading = false;
            state.value = actions.payload;
        }).addCase(handleGetTripAction.rejected, (state, actions) => {
            state.isLoading = false
        })





    }
})

export default TripReducer.reducer;