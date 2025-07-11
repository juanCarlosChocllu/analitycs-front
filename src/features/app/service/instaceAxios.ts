import axios, { AxiosError } from "axios";



export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

instance.interceptors.request.use(
  (config) => {
    const token = "michi";
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
      window.localStorage.removeItem('token')
      window.location.href = "/";
      return
    }else {
      throw error
    }
  }
);

