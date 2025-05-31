package com.example.backend.repositories;

import com.example.backend.models.Member;
import com.example.backend.models.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Override
    Page<Payment> findAll(Pageable pageable);

    List<Payment> findByMemberId(Long memberId);
    boolean existsByTransactionCode(String transactionCode);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.paymentDate BETWEEN :startDate AND :endDate")
    Double sumAmountByPaymentDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT FUNCTION('MONTH', p.paymentDate) as month, SUM(p.amount) as revenue " +
            "FROM Payment p " +
            "WHERE FUNCTION('YEAR', p.paymentDate) = :year " +
            "GROUP BY FUNCTION('MONTH', p.paymentDate) " +
            "ORDER BY FUNCTION('MONTH', p.paymentDate)")
    List<Object[]> getMonthlyRevenueForYear(int year);
}
