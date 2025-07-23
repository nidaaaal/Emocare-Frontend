// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7237/api', // replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
