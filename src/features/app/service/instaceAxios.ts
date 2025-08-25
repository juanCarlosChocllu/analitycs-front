import axios, { AxiosError } from "axios";

const url_api = import.meta.env.VITE_API_BASE_URL
export const instance = axios.create({
  baseURL: `${url_api}/api/`,
  headers: {
    "Content-Type": "application/json",  
  },
  withCredentials: true,
});

function getToken() {
  const token = localStorage.getItem('ctx');
  if(!token){
    return import.meta.env.VITE_TOKEN
  }
  return token;
}

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return error;
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const a = error as AxiosError;
    if (a.status === 401) {
      //window.localStorage.removeItem('token')
       //window.location.href = "https://analitycs-frontend.vercel.app/";
      return
    }else {
      throw error
    }
  }
);

