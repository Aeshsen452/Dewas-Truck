import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
    name: "Auth",

    initialState: {
        isLoggedIn: true,
        userData: null
    },

    reducers: {
        addUser: (state, action) => {

        },
        removeUser: (state) => {
            state.isLoggedIn = false,
                state.userData = null
        },
        updateUser: (state, action) => {

        }
    }


})


export const { addUser, removeUser, updateUser } = AuthReducer.actions;

export default AuthReducer.reducer