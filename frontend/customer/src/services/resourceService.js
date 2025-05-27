import api from './api';

export const roomService = {
    getAll: async () => {
        const response = await api.get('/rooms');
        return response.data;
    },
};

export const equipmentService = {
    getAll: async () => {
        const response = await api.get('/equipments');
        return response.data;
    },
};

export const packageService = {
    getAll: async () => {
        const response = await api.get('/packages');
        return response.data;
    },
};

export const trainerService = {
    getAll: async () => {
        const response = await api.get('/trainers');
        return response.data;
    },
}; 