import { Http } from "../Http"

export const getPackages = (page = 1) => Http.get(`/packages?page=${page}`);

export const createPackage = (data) => Http.post("/packages", data);

export const editPackage = (id, data) => Http.put(`packages/${id}`, data);

export const deletePackage = (id) => Http.delete(`/packages/${id}`);
