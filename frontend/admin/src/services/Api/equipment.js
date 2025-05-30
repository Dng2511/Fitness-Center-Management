import { Http } from "../Http"

export const getEquipments = () => Http.get("/equipments")
export const createEquipment = (data) => Http.post("/equipments", data)
export const deleteEquipment = (id) => Http.delete(`equipments/${id}`)