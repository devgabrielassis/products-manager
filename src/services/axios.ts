import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "https://api-teste-front-production.up.railway.app/",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      Cookies.get("product-manager-token") || "-------------no-token-------------";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);