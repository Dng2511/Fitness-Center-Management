package com.example.backend.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface DashboardService {
    Map<String, Object> getDashboardStatistics();

    Map<String, Object> getMonthlyRevenueStatistics();

    Map<String, Object> getActiveMembers(int page, int size);

    Long getActiveMemberCount();
}
