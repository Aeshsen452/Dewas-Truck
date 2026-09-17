import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../features/auth/state/authState.js"
import DashSlice from "../features/Home/state/dash.Slice.js"

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        dash: DashSlice
    },
})