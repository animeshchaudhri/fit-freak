import axios, { AxiosInstance } from "axios";
import { clearTokens, getAccessToken } from "../utils/tokenManager";
import { getNewAccessToken, isTokenExpired } from "../utils/jwtUtils";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 120000 // 2 minutes
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const accessToken = getAccessToken();

    if (accessToken && isTokenExpired(accessToken) && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await getNewAccessToken();

      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } else {
        clearTokens();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 