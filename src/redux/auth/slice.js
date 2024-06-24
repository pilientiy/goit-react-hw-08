import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, register } from "./operations";

const handlePending = state => {
    state.error = false;
    state.loading = true;
}
        
const handleRejected = state => {
    state.loading = false;
    state.error = true;
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
            name: null,
            email: null,
        },
        token: null,
        isLoggedIn: false,
        loading: false,
        error: null,
        isRefreshing: false,
    },
    extraReducers: builder => {
        builder.addCase(register.pending, handlePending)
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.loading = false;
            })
            .addCase(register.rejected, handleRejected)
            .addCase(login.pending, handlePending)
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.loading = false;
            })
            .addCase(login.rejected, handleRejected)
            .addCase(logout.pending, handlePending)
            .addCase(logout.fulfilled, (state) => {
                state.user = {
                    name: null,
                    email: null,
                };
                state.token = null;
                state.isLoggedIn = false;
                state.loading = false;
                state.error = null;
            })
            .addCase(logout.rejected, handleRejected)
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, (state) => {
            state.isRefreshing = false;
        })
    }
})

export default authSlice.reducer;