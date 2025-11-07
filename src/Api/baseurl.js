// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://emocare-backend-uavk.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true, 
});

export default api;
