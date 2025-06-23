
import { API_BASE } from './baseApi';
import axios from 'axios';
import { getToken } from './index';

const API = axios.create({
    baseURL: API_BASE,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

// Automatically attach Bearer token to requests
API.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
    

export default API;
