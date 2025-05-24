import axiosInstance from './axiosConfig';

export const memberService = {
    getAllMembers: async () => {
        const response = await axiosInstance.get('/members');
        return response.data;
    },

    getMemberById: async (id) => {
        const response = await axiosInstance.get(`/members/${id}`);
        return response.data;
    },

    createMember: async (memberData) => {
        const response = await axiosInstance.post('/members', memberData);
        return response.data;
    },

    updateMember: async (id, memberData) => {
        const response = await axiosInstance.put(`/members/${id}`, memberData);
        return response.data;
    },

    deleteMember: async (id) => {
        const response = await axiosInstance.delete(`/members/${id}`);
        return response.data;
    }
}; 