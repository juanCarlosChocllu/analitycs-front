import axios from "axios";

export const comisionesInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
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