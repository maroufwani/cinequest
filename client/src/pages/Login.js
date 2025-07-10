import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import api from '../api/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', { email, password });
            login(data);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error.response?.data?.message || error.message);
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            <p>
                New User? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;