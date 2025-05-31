package com.example.backend.repositories;

import com.example.backend.models.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @Override
    Page<Member> findAll(Pageable pageable);

    boolean existsByPhoneNumber(String phoneNumber);

    Member findByPhoneNumber(String phoneNumber);

    // Tìm tất cả member có gói tập còn hiệu lực
    @Query("SELECT m FROM Member m WHERE m.packageEndDate >= CURRENT_DATE")
    Page<Member> findActiveMembershipsPageable(Pageable pageable);

    // Đếm số lượng membership đang hoạt động
    @Query("SELECT COUNT(m) FROM Member m WHERE m.packageEndDate >= CURRENT_DATE")
    Long countActiveMemberships();

    Optional<Member> findByUserId(Long userId);
}
