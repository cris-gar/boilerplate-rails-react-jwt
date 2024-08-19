// app/javascript/redux/exampleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
    name: 'example',
    initialState: {
        message: 'Hello, Redux Toolkit!',
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { setMessage } = exampleSlice.actions;
export default exampleSlice.reducer;
