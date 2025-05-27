import api from '../services/api';

export const memberAPI = {
    getAllMembers: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    getMemberById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    createMember: async (memberData) => {
        const response = await api.post('/users/register', memberData);
        return response.data;
    },

    updateMember: async (id, memberData) => {
        const response = await api.put(`/users/${id}`, memberData);
        return response.data;
    },

    deleteMember: async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },

    // Member payments related endpoints can be added here if needed
    getMemberPayments: async (memberId) => {
        const response = await api.get(`/users/${memberId}/payments`);
        return response.data;
    },

    addMemberPayment: async (memberId, paymentData) => {
        const response = await api.post(`/users/${memberId}/payments`, paymentData);
        return response.data;
    }
}; 