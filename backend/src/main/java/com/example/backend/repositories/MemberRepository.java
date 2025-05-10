package com.example.backend.repositories;

import com.example.backend.models.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @Override
    Page<Member> findAll(Pageable pageable);
}
