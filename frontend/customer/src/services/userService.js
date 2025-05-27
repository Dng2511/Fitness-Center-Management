import api from './api';






const userService = {
    register: async (userData) => {
        try {
            const response = await api.post('/users/register', userData);
            return response.data;
        } catch (error) {
            throw {
                message: error.message || 'Registration failed',
                status: error.status || 500
            };
        }
    },

    getAllUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            throw {
                message: error.message || 'Failed to fetch users',
                status: error.status || 500
            };
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/users/me');
            return response.data;
        } catch (error) {
            throw {
                message: error.message || 'Failed to fetch current user',
                status: error.status || 500
            };
        }
    },

    updateUser: async (userId, userData) => {
        try {
            const response = await api.put(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw {
                message: error.message || 'Failed to update user',
                status: error.status || 500
            };
        }
    },
};

export default userService; 