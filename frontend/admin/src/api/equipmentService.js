import axiosInstance from './axiosConfig';

export const equipmentService = {
    getAllEquipments: async () => {
        const response = await axiosInstance.get('/equipments');
        return response.data;
    },

    getEquipmentById: async (id) => {
        const response = await axiosInstance.get(`/equipments/${id}`);
        return response.data;
    },

    createEquipment: async (equipmentData) => {
        const response = await axiosInstance.post('/equipments', equipmentData);
        return response.data;
    },

    updateEquipment: async (id, equipmentData) => {
        const response = await axiosInstance.put(`/equipments/${id}`, equipmentData);
        return response.data;
    },

    deleteEquipment: async (id) => {
        const response = await axiosInstance.delete(`/equipments/${id}`);
        return response.data;
    },

    // Bulk operations
    createMultipleEquipments: async (equipmentsData) => {
        const response = await axiosInstance.post('/equipments/bulk', equipmentsData);
        return response.data;
    },

    // Equipment maintenance
    updateMaintenanceStatus: async (id, maintenanceData) => {
        const response = await axiosInstance.put(`/equipments/${id}/maintenance`, maintenanceData);
        return response.data;
    }
}; 