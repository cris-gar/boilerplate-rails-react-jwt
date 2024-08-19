import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { login, checkAuth, logout } from '../../redux/reducers/authReducer'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            {auth?.isAuthenticated ? (
                <div>
                    <h2>Welcome, {auth.user.email}</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            )}
            {auth.status === 'loading' && <p>Loading...</p>}
            {auth.error && <p>Error: {auth.error}</p>}
        </div>
    )
};

export default Login;
