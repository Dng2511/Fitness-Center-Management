import { Http } from "../Http"

export const getDashboardStatistics = () => Http.get("/dashboard");

export const getMonthlyRevenue = () => Http.get("/dashboard/monthly-revenue");

export const getActiveMembers = (page = 0, size = 10) =>
    Http.get(`/dashboard/membership?page=${page}&size=${size}`);

export const getActiveMemberCount = () => Http.get("/dashboard/count-memberships"); 