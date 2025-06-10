package com.example.backend.repositories;

import com.example.backend.models.User;
import com.example.backend.models.WorkoutHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutHistoryRepository extends JpaRepository<WorkoutHistory, Long> {
    @Override
    Page<WorkoutHistory> findAll(Pageable pageable);

    List<WorkoutHistory> findByMemberIdOrderByWorkoutDateDesc(Long memberId);
    List<WorkoutHistory> findByTrainerIdOrderByWorkoutDateDesc(Long trainerId);
}
