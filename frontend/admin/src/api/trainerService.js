import axiosInstance from './axiosConfig';

export const trainerService = {
    getAllTrainers: async () => {
        const response = await axiosInstance.get('/trainers');
        return response.data;
    },

    getTrainerById: async (id) => {
        const response = await axiosInstance.get(`/trainers/${id}`);
        return response.data;
    },

    createTrainer: async (trainerData) => {
        const response = await axiosInstance.post('/users/add-trainer', trainerData);
        return response.data;
    },

    updateTrainer: async (id, trainerData) => {
        const response = await axiosInstance.put(`/trainers/${id}`, trainerData);
        return response.data;
    },

    deleteTrainer: async (id) => {
        const response = await axiosInstance.delete(`/trainers/${id}`);
        return response.data;
    }
}; 