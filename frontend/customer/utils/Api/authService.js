import { Http } from "../Http";

export const login = (data) => Http.post("/auth/login", data);

export const register = (data) => Http.post("/users/register", data)