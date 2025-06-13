import { Http } from "../Http";

export const getAllFeedbacks = (config) => Http.get("/feedbacks", config);