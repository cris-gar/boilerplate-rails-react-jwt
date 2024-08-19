import {createAsyncThunk} from "@reduxjs/toolkit";

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/users/sign_out', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            return {};
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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

            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });
