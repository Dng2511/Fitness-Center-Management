import axiosInstance from './axiosConfig';

export const authService = {
    login: async (username, password) => {
        const response = await axiosInstance.post('/auth/login', {
            username,
            password
        });
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
        }
        return response.data;
    },

    register: async (userData) => {
        const response = await axiosInstance.post('/users/register', userData);
        return response.data;
    },

    addTrainer: async (trainerData) => {
        const response = await axiosInstance.post('/users/add-trainer', trainerData);
        return response.data;
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
        } finally {
            localStorage.removeItem('accessToken');
        }
    },

    refreshToken: async () => {
        const response = await axiosInstance.post('/auth/refresh');
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
        }
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await axiosInstance.get('/auth/introspect');
        return response.data;
    }
}; 