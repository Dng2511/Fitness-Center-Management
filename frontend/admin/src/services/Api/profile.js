import { Http } from "../Http";

export const getProfile = () => Http.get("/users/my-info");