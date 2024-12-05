/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
});

const loginApi = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, loginApi };
