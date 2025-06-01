import axios from "axios";
import Cookies from "js-cookie";
import { addToast } from "@heroui/react";

export const api = axios.create({
  baseURL: "https://api-teste-front-production.up.railway.app/",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      Cookies.get("product-manager-token") ||
      "-------------no-token-------------";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response.data.codeIntern === "ATH_0002") {
      window.location.href = "/auth/login";
      addToast({
        title: "Atenção!",
        description: error.response.data.message,
        color: "danger",
      });
    }

    return Promise.reject(error);
  }
);
