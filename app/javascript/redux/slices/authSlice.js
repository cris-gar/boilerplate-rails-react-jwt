// app/javascript/redux/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, logout, checkAuth } from '../reducers/authReducer';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        logoutSuccess(state) {
            state.isAuthenticated = false;
            state.status = 'idle';
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(checkAuth.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload || action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'idle';
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },

});

export const {
    setEmail,
    logoutSuccess,
    setPassword,
    loginSuccess
} = authSlice.actions;
export default authSlice.reducer;
