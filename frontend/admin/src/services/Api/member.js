import { Http } from "../Http"
export const getMembers = (config) => Http.get("/members/search", config);

export const createMember = (data) => Http.post("/members", data);

export const editMember = (id, data) => Http.put(`members/${id}`, data);

export const deleleMember = (id) => Http.delete(`members/${id}`);
