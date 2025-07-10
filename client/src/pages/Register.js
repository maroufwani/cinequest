import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import api from '../api/axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/register', { username, email, password });
            login(data);
            navigate('/');
        } catch (error) {
    // --- THIS IS THE KEY CHANGE ---
    // Log the entire error object to see its structure.
    console.error('An error occurred during registration:', error);
    
    // Check if the expected error response structure exists
    const message = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'An unexpected error occurred. Please check the console.';

    alert('Registration failed: ' + message);
}
    };

    return (
        <div className="auth-container">
            <h1>Register</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;