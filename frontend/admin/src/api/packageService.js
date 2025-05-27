import axiosInstance from './axiosConfig';

export const packageService = {
    getAllPackages: async () => {
        const response = await axiosInstance.get('/packages');
        return response.data;
    },

    getPackageById: async (id) => {
        const response = await axiosInstance.get(`/packages/${id}`);
        return response.data;
    },

    createPackage: async (packageData) => {
        const response = await axiosInstance.post('/packages', packageData);
        return response.data;
    },

    updatePackage: async (id, packageData) => {
        const response = await axiosInstance.put(`/packages/${id}`, packageData);
        return response.data;
    },

    deletePackage: async (id) => {
        const response = await axiosInstance.delete(`/packages/${id}`);
        return response.data;
    }
}; 