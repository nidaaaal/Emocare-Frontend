// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://emocare-backend-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true, 
});

export default api;
