import {Http} from "../Http"

export const getPackages = () => Http.get("/packages");

export const createPackage = (data) => Http.post("/packages", data);

export const editPackage = (id, data) => Http.put(`packages/${id}`, data);

export const delelePackage = (id) => Http.delete(`packages/${id}`);
