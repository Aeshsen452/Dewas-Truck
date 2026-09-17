import { createSlice } from "@reduxjs/toolkit";

const DashSlice = createSlice({
    name: "Dash",
    initialState: {
        selectedDriver: "",
        calender: ""
    },
    reducers: {
        SelectingDriver: (state, actions) => {
            state.selectedDriver = actions.payload
        },
        SelectingCalender: (state, actions) => {
            state.calender = actions.payload
        }

    }
})


export const { SelectingDriver, SelectingCalender } = DashSlice.actions;

export default DashSlice.reducer