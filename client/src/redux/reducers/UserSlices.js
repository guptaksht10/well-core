import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSucces: (state, action) => {
            state.currentUser = action.payload.user;
            localStorage.setItem("wellcore-app-token", action.payload.token);
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("wellcore-app-token");
        }

    }
})

export const { loginSucces, logout } = UserSlice.actions;
export default UserSlice.reducer;