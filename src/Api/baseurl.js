// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7237/api',
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true, // ✅ Add this to send cookies
});

export default api;
