import axios from 'axios';

// The backend server URL will be different in development vs. production
const API_URL = process.env.NODE_ENV === 'production' 
    ? '' // Empty string means same domain in production
    : 'http://localhost:5001'; // Your local backend server

const api = axios.create({
    baseURL: `${API_URL}/api`,
});

export default api;