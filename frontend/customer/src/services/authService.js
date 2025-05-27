import api from './api';
import { cusFetchPost } from './cusFetch';

const headers = {
    'Content-Type': 'application/json',
}

const authService = {
    login: async ({ email, password }) => {
        try {
            const response = await api.post('/auth/login', { username: email, password });
            if (response.data.token) {
                localStorage.setItem('accessToken', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            console.log(response.data)
            return response.data;
            // const response = await cusFetchPost('http://localhost:8000/auth/login', { email, password });
            // if (response.data.accessToken) {
            //     localStorage.setItem('accessToken', response.data.accessToken);
            //     localStorage.setItem('refreshToken', response.data.refreshToken);
            // }
            // return response.data;
        } catch (error) {
            throw {
                message: error.message || 'Login failed',
                status: error.status || 500
            };
        }
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    },

    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await api.post('/auth/refresh', { refreshToken });
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
            }
            return response.data;
        } catch (error) {
            throw {
                message: error.message || 'Token refresh failed',
                status: error.status || 500
            };
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/introspect');
            return response.data;
        } catch (error) {
            throw {
                message: error.message || 'Failed to get current user',
                status: error.status || 500
            };
        }
    },
};

export default authService; 