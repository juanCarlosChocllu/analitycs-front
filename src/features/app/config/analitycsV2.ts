import axios, { AxiosError } from "axios";

export const analitycsV2 = axios.create({
  baseURL: `${import.meta.env.VITE_API_ANALITYCS_URL}/api/v2/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});

analitycsV2.interceptors.response.use((config) => {
    return config;
}, (error) => {
  if(window.location.pathname != '/'){
     const e = error as AxiosError
  if(e.status == 403 || e.status == 401){
    return window.location.href = '/'
  }
  }  
});