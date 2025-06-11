import { Http } from "../Http"

export const getFeedbacks = () => Http.get("/feedback")
