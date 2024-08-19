// app/javascript/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import exampleReducer from './slices/exampleSlice'; // import slices
import loginReducer from './slices/loginSlice'; // import slices
import authReducer from './slices/authSlice'; // import slices

const middlewares = [];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
}

// config and export the store
const store = configureStore({
    reducer: {
        example: exampleReducer,
        login: loginReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
