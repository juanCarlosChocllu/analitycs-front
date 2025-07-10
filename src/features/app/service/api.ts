import axios, { AxiosError } from "axios";


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});

function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

api.interceptors.request.use(
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

api.interceptors.response.use(
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

export default api;
