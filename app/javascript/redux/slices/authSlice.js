// app/javascript/redux/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            console.log('credentials', credentials)
            const body = { user: credentials };
            const response = await fetch('/users/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk para verificar la sesión
export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('/users/validate_token', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
});

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/users/sign_out', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            return {}; // No es necesario devolver datos al cerrar sesión
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
