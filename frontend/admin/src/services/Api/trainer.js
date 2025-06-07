import { Http } from "../Http"

export const getTrainer = (page = 1) => Http.get(`/trainer?page=${page}`);

export const createTrainer = (data) => Http.post("/trainer", data);

export const editTrainer = (id, data) => Http.put(`/trainer/${id}`, data);

export const deleteTrainer = (id) => Http.delete(`/trainer/${id}`);