import axios from "axios";

export const comisionesInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_COMISIONES_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },

});

comisionesInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('ctx');  
    if (token) {
      
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});