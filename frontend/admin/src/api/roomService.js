import axiosInstance from './axiosConfig';

export const roomService = {
    getAllRooms: async () => {
        const response = await axiosInstance.get('/rooms');
        return response.data;
    },

    getRoomById: async (id) => {
        const response = await axiosInstance.get(`/rooms/${id}`);
        return response.data;
    },

    createRoom: async (roomData) => {
        const response = await axiosInstance.post('/rooms', roomData);
        return response.data;
    },

    updateRoom: async (id, roomData) => {
        const response = await axiosInstance.put(`/rooms/${id}`, roomData);
        return response.data;
    },

    deleteRoom: async (id) => {
        const response = await axiosInstance.delete(`/rooms/${id}`);
        return response.data;
    },

    // Room equipment management
    getRoomEquipments: async (roomId) => {
        const response = await axiosInstance.get(`/rooms/${roomId}/equipments`);
        return response.data;
    },

    addEquipmentToRoom: async (roomId, equipmentData) => {
        const response = await axiosInstance.post(`/rooms/${roomId}/equipments`, equipmentData);
        return response.data;
    },

    removeEquipmentFromRoom: async (roomId, equipmentId) => {
        const response = await axiosInstance.delete(`/rooms/${roomId}/equipments/${equipmentId}`);
        return response.data;
    }
}; 