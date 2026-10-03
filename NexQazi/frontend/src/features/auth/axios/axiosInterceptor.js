import api from "./axios";
import { setAccessToken, logout } from "../state/authSlice";

export const setupAxiosInterceptors = (store) => {
  // REQUEST INTERCEPTOR
  api.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().auth.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // RESPONSE INTERCEPTOR
  api.interceptors.response.use(
    (response) => response,

   

    async (error) => {
      const originalRequest = error.config;

      if(!originalRequest) {
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh-token")
      ) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await api.post(
            "/auth/refresh-token"
          );

          const newAccessToken =
            refreshResponse.data.accessToken;

          store.dispatch(setAccessToken(newAccessToken));

          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};