// app/javascript/application.js

import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; // Importa el store de Redux Toolkit
import HelloReduxToolkit from "./components/HelloReduxToolkit"; // Importa tu componente
import Login from "./views/login"; // Importa tu componente

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement); // Crea un root usando createRoot
    root.render(
        <Provider store={store}>
            <Login />
        </Provider>
    );
});
