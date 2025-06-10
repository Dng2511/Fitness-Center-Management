package com.example.backend.repositories;

import com.example.backend.models.Member;
import com.example.backend.models.Trainer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    @Override
    Page<Trainer> findAll(Pageable pageable);


    Optional<Trainer> findByUserId(Long id);
}
