package com.example.backend.services.implement;

import com.example.backend.models.Member;
import com.example.backend.repositories.MemberRepository;
import com.example.backend.repositories.PaymentRepository;
import com.example.backend.services.DashboardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DashboardServiceImpl implements DashboardService {

    PaymentRepository paymentRepository;
    MemberRepository memberRepository;

    @Override
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

        return statistics;
    }

    @Override
    public Map<String, Object> getMonthlyRevenueStatistics() {
        Map<String, Object> monthlyRevenue = new LinkedHashMap<>();

        for (int i = 1; i <= 12; i++) {
            String monthName = Month.of(i).getDisplayName(TextStyle.FULL, Locale.getDefault());
            monthlyRevenue.put(monthName, 0.0);
        }

        List<Object[]> revenueData = paymentRepository.getCurrentYearMonthlyRevenue();

        for (Object[] data : revenueData) {
            int month = ((Number) data[0]).intValue();

            Double revenue = data[1] == null ? 0.0 : ((Number) data[1]).doubleValue();

            String monthName = Month.of(month).getDisplayName(TextStyle.FULL, Locale.getDefault());
            monthlyRevenue.put(monthName, revenue);
        }

        return monthlyRevenue;
    }

    @Override
    public Map<String, Object> getActiveMembers(int page, int size) {
        Map<String, Object> result = new HashMap<>();

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "packageStartDate"));
        Page<Member> membersPage = memberRepository.findActiveMembershipsPageable(pageRequest);

        LocalDate today = LocalDate.now();
        List<Map<String, Object>> membersList = membersPage.getContent().stream()
                .map(member -> {
                    Map<String, Object> memberMap = new HashMap<>();
                    memberMap.put("MemberId", member.getId());
                    memberMap.put("name", member.getName());
                    memberMap.put("phoneNumber", member.getPhoneNumber());
                    memberMap.put("packageName", member.getTrainingPackage().getPackageName());
                    //memberMap.put("packagePrice", member.getTrainingPackage().getPrice());
                    memberMap.put("packageStartDate", member.getPackageStartDate());
                    memberMap.put("packageEndDate", member.getPackageEndDate());

                    if (member.getPackageEndDate() != null) {
                        long daysRemaining = ChronoUnit.DAYS.between(today, member.getPackageEndDate());
                        memberMap.put("daysRemaining", daysRemaining);
                    }

                    return memberMap;
                })
                .collect(Collectors.toList());

        result.put("members", membersList);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("totalElements", membersPage.getTotalElements());
        pageInfo.put("totalPages", membersPage.getTotalPages());
        pageInfo.put("currentPage", membersPage.getNumber());
        pageInfo.put("size", membersPage.getSize());
        pageInfo.put("hasNext", membersPage.hasNext());
        pageInfo.put("hasPrevious", membersPage.hasPrevious());

        result.put("pageInfo", pageInfo);

        return result;
    }

    @Override
    public Long getActiveMemberCount() {
        return memberRepository.countActiveMemberships();
    }

}
