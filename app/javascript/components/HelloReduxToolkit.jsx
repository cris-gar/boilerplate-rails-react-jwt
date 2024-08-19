// app/javascript/components/HelloReduxToolkit.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/exampleSlice'; // import the actions

const HelloReduxToolkit = () => {
    const message = useSelector((state) => state.example.message);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setMessage('Hello, from React and Redux Toolkit!'));
    };

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={handleClick}>Set Message</button>
        </div>
    );
};

export default HelloReduxToolkit;
