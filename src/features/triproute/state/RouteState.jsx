import { createSlice } from "@reduxjs/toolkit";


const RouteReducer = createSlice({
    name: "Route",
    initialState: {
        value: []
    },
    reducers: {
        addRoute: (state, action) => {
            const { payload } = action;
            state.value.unshift(payload)
        },
        removeRoute: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((r) => r._id !== id);
        },
        editRoute: (state, action) => {
            const { payload } = action;

            state.value = state.value.map((item) => {
                return item._id === payload._id ? payload : item
            })

        },
        setvalue: (state, action) => {
            const { payload } = action;
            state.value = payload
        }
    }
})

export const { addRoute, removeRoute, editRoute, setvalue } = RouteReducer.actions;

export default RouteReducer.reducer;