// src/services/api.js
import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });
const api = axios.create({
    baseURL: 'http://localhost:5000/api',  // Confirm this matches your backend URL
  });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
