import { Http } from "../Http";

export const getTrainers = (config) => Http.get("/trainers", config);

export const createTrainer = (data) => Http.post("/users/add-trainer", data)