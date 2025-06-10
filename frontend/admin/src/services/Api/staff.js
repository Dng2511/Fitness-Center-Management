import { Http } from "../Http";

export const getStaffs = (config) => Http.get("/staffs", config);

export const createStaff = (data) => Http.post("/users/add-staff", data)