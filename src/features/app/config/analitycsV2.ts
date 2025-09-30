import axios from "axios";
console.log(import.meta.env.VITE_API_ANALITYCS_URL);

export const analitycsV2 = axios.create({
  baseURL: `${import.meta.env.VITE_API_ANALITYCS_URL}/api/v2/`,
  headers: {
    "Content-Type": "application/json",
  },

});

analitycsV2.interceptors.request.use((config) => {
    const token = localStorage.getItem('ctx');  
    if (token) {
      
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});