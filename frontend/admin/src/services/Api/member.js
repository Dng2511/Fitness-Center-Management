import { Http } from "../Http"

export const getMembers = (page = 1) => Http.get(`/members?page=${page}`);

export const createMember = (data) => Http.post("/members", data);

export const editMember = (id, data) => Http.put(`members/${id}`, data);

export const deleteMember = (id) => Http.delete(`/members/${id}`);
