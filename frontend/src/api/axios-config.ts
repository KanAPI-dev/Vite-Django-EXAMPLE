import axios from "axios";
import getCookie from "@/lib/utils/get-cookie";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL
    : apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * According to chat gippity, it's better to attach the csrf header
 * inside the axios interceptor. This will prevent stale csrf values
 * from being passed, which could cause validation issues.
 */
api.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
