package com.example.backend.repositories;

import com.example.backend.models.Member;
import com.example.backend.models.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Override
    Page<Payment> findAll(Pageable pageable);

    // Tổng doanh thu của tất cả các giao dịch thành công
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'SUCCESS'")
    Double getTotalRevenue();

    // Số lượng giao dịch thành công
    @Query("SELECT COUNT(p) FROM Payment p WHERE p.status = 'SUCCESS'")
    Long getSuccessfulTransactionCount();

    // Doanh thu trong 30 ngày gần đây
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'SUCCESS' AND p.paymentDate >= :startDate")
    Double getRevenueInLast30Days(@Param("startDate") LocalDateTime startDate);

    // Số lượng gói tập đã đăng ký (thành công)
    @Query("SELECT COUNT(DISTINCT p.trainingPackage) FROM Payment p WHERE p.status = 'SUCCESS'")
    Long getUniquePackageCount();

    // Doanh thu theo từng gói tập
    @Query("SELECT p.trainingPackage.packageName, COUNT(p), SUM(p.amount) FROM Payment p " +
            "WHERE p.status = 'SUCCESS' GROUP BY p.trainingPackage.packageName")
    List<Object[]> getPackageStatistics();

    // Doanh thu theo từng tháng trong năm hiện tại
    @Query(value = "SELECT MONTH(payment_date) AS month, SUM(amount) " +
            "FROM payments WHERE status = 'SUCCESS' AND YEAR(payment_date) = YEAR(GETDATE()) " +
            "GROUP BY MONTH(payment_date) ORDER BY month", nativeQuery = true)
    List<Object[]> getCurrentYearMonthlyRevenue();

    // Số lượng thành viên mới đăng ký (dựa trên giao dịch đầu tiên của họ)
    @Query(value = "SELECT COUNT(DISTINCT member_id) FROM payments WHERE status = 'SUCCESS'", nativeQuery = true)
    Long getTotalMembersCount();

    // Số thành viên mới trong 30 ngày qua
    @Query(value = "SELECT COUNT(DISTINCT member_id) FROM payments " +
            "WHERE status = 'SUCCESS' AND payment_date >= :startDate", nativeQuery = true)
    Long getNewMembersInLast30Days(@Param("startDate") LocalDateTime startDate);

    // Top 5 gói tập phổ biến nhất
    @Query("SELECT p.trainingPackage.packageName, COUNT(p) as count FROM Payment p " +
            "WHERE p.status = 'SUCCESS' GROUP BY p.trainingPackage.packageName ORDER BY count DESC")
    List<Object[]> getTopPackages(Pageable pageable);
}
