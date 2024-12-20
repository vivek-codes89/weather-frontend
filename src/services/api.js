import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance with base URL
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

// Auth API
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);

// Weather API
export const fetchWeather = (query) => api.get(`/weather/weather?${query}`);
export const fetchLogs = () => api.get('/weather/logs');
