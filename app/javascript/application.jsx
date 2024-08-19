// app/javascript/application.js

import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';

import Login from "./views/login";

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement);
    root.render(
        <Provider store={store}>
            <Login />
        </Provider>
    );
});
