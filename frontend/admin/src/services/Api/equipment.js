import { Http } from "../Http"

export const getEquipments = (page = 1) => Http.get(`/equipments?page=${page}`);
export const createEquipment = (data) => Http.post("/equipments", data);
export const deleteEquipment = (id) => Http.delete(`/equipments/${id}`);