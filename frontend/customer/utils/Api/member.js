import { Http } from "../Http"
export const getMembers = () => Http.get("/members");

export const createMember = (data) => Http.post("/members", data);

export const editMember = (id, data) => Http.put(`members/${id}`, data);

export const deleleMember = (id) => Http.delete(`members/${id}`);
