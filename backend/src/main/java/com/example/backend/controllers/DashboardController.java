package com.example.backend.controllers;

import com.example.backend.services.DashboardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@PreAuthorize("hasRole('ADMIN')" + " or hasRole('STAFF')")
public class DashboardController {

    DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboard() {
        Map<String, Object> dashboardData = dashboardService.getDashboardStatistics();
        return ResponseEntity.ok(dashboardData);
    }

    @GetMapping("/monthly-revenue")
    public ResponseEntity<Map<String, Object>> getMonthlyRevenue() {
        Map<String, Object> monthlyRevenueData = dashboardService.getMonthlyRevenueStatistics();
        return ResponseEntity.ok(monthlyRevenueData);
    }

    @GetMapping("/membership")
    public ResponseEntity<Map<String, Object>> getActiveMembers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Map<String, Object> result = dashboardService.getActiveMembers(page, size);
        return ResponseEntity.ok(result);
    }

    @GetMapping("count-memberships")
    public ResponseEntity<Long> countActiveMemberships() {
        Long activeMembershipCount = dashboardService.getActiveMemberCount();
        return ResponseEntity.ok(activeMembershipCount);
    }
}