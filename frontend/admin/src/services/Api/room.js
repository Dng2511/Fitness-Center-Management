import { Http } from "../Http";

export const getRooms = (page = 1) => Http.get(`/rooms?page=${page}`);
export const getEquipmentsByRoom = (id) => Http.get(`/rooms/${id}/equipments`);
export const createRoom = (data) => Http.post("/rooms", data);
export const updateRoom = (id, data) => Http.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => Http.delete(`/rooms/${id}`);