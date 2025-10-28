import axios, { AxiosError } from "axios";

export const analitycsV2 = axios.create({
  baseURL: `${import.meta.env.VITE_API_ANALITYCS_URL}/api/v2/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

analitycsV2.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
  
    if (window.location.pathname !== "/") {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        //window.location.href = "/";
        return;
      }
    }

    return Promise.reject(error);
  }
);
