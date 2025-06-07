import axios from "axios"

export const Http = axios.create({
  baseURL: "http://localhost:8000",
})

Http.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
Http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          // No refresh token, redirect to login
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post("http://localhost:8000/auth/refresh", {
          refresh_token: refreshToken,
        });

        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return Http(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, clear storage and redirect to login
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);