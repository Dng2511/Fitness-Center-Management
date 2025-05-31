package com.example.backend.services.implement;

import com.example.backend.repositories.PaymentRepository;
import com.example.backend.services.DashboardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DashboardServiceImpl implements DashboardService {

    PaymentRepository paymentRepository;

    @PreAuthorize("hasRole('ADMIN')" + " or hasRole('STAFF')")
    public Map<String, Object> getDashboardStatistics() {
        Map<String, Object> statistics = new HashMap<>();

        // Thời gian 30 ngày trước đến hiện tại
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);

        // 1. Tổng doanh thu và doanh thu 30 ngày gần đây
        Double totalRevenue = paymentRepository.getTotalRevenue();
        Double recentRevenue = paymentRepository.getRevenueInLast30Days(thirtyDaysAgo);

        statistics.put("totalRevenue", totalRevenue != null ? totalRevenue : 0);
        statistics.put("recentRevenue", recentRevenue != null ? recentRevenue : 0);

        // 2. Số lượng giao dịch thành công
        Long transactionCount = paymentRepository.getSuccessfulTransactionCount();
        statistics.put("transactionCount", transactionCount != null ? transactionCount : 0);

        // 3. Thông tin thành viên
        Long totalMembers = paymentRepository.getTotalMembersCount();
        Long newMembers = paymentRepository.getNewMembersInLast30Days(thirtyDaysAgo);

        statistics.put("totalMembers", totalMembers != null ? totalMembers : 0);
        statistics.put("newMembers", newMembers != null ? newMembers : 0); // Số thành viên đăng ký trong 30 ngày qua

        // 4. Thống kê gói tập
        Long uniquePackageCount = paymentRepository.getUniquePackageCount();
        statistics.put("uniquePackageCount", uniquePackageCount != null ? uniquePackageCount : 0);

        // 5. Top 5 gói tập phổ biến nhất
        List<Map<String, Object>> topPackages = new ArrayList<>();
        List<Object[]> packageData = paymentRepository.getTopPackages(PageRequest.of(0, 5));

        for (Object[] data : packageData) {
            Map<String, Object> packageInfo = new HashMap<>();
            packageInfo.put("name", data[0]);
            packageInfo.put("count", data[1]);
            topPackages.add(packageInfo);
        }
        statistics.put("topPackages", topPackages);

        // 6. Thống kê theo từng gói tập
        List<Map<String, Object>> packageStatistics = new ArrayList<>();
        List<Object[]> packageStatsData = paymentRepository.getPackageStatistics();

        for (Object[] data : packageStatsData) {
            Map<String, Object> packageInfo = new HashMap<>();
            packageInfo.put("name", data[0]);
            packageInfo.put("count", data[1]);
            packageInfo.put("revenue", data[2]);
            packageStatistics.add(packageInfo);
        }
        statistics.put("packageStatistics", packageStatistics);

        // 7. Doanh thu theo tháng trong năm hiện tại
        List<Map<String, Object>> monthlyRevenue = new ArrayList<>();
        List<Object[]> monthlyData = paymentRepository.getCurrentYearMonthlyRevenue();

        // Tạo dữ liệu cho tất cả 12 tháng với giá trị mặc định là 0
        Map<Integer, Double> monthlyRevenueMap = new HashMap<>();
        for (int i = 1; i <= 12; i++) {
            monthlyRevenueMap.put(i, 0.0);
        }

        // Cập nhật dữ liệu từ kết quả truy vấn
        for (Object[] data : monthlyData) {
            Integer month = ((Number) data[0]).intValue();
            Double revenue = ((Number) data[1]).doubleValue();
            monthlyRevenueMap.put(month, revenue);
        }

        // Chuyển sang định dạng final
        for (int i = 1; i <= 12; i++) {
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", i);
            monthData.put("monthName", Month.of(i).getDisplayName(TextStyle.FULL, Locale.getDefault()));
            monthData.put("revenue", monthlyRevenueMap.get(i));
            monthlyRevenue.add(monthData);
        }

        statistics.put("monthlyRevenue", monthlyRevenue);

        return statistics;
    }
}
