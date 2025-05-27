import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // If there's no response object at all, reject with the original error
        if (!error.response) {
            return Promise.reject(new Error('Network error or server is not responding'));
        }

        const originalRequest = error.config;

        // If the error is 401 and we haven't retried yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post('http://localhost:8000/auth/refresh', {
                    refreshToken,
                });

                if (!response.data || !response.data.accessToken) {
                    throw new Error('Invalid refresh token response');
                }

                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, clear tokens and redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // For all other errors, return a rejected promise with the error
        return Promise.reject({
            message: error.response?.data?.message || 'An error occurred',
            status: error.response?.status,
            data: error.response?.data
        });
    }
);

export default api; 