package com.example.backend.repositories;

import com.example.backend.models.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Override
    Page<Feedback> findAll(Pageable pageable);
}
