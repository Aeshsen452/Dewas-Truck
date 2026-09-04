import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../features/auth/state/authState.js"
export const store = configureStore({
    reducer: {
        auth: AuthReducer,
    },
})