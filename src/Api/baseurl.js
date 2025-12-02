// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7237/api', // || https://emocare-backend-production.up.railway.app
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true, 
});

export default api;
