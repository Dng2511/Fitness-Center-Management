package com.example.backend.repositories;

import com.example.backend.models.TrainingPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingPackageRepository extends JpaRepository<TrainingPackage, Long> {
    @Override
    Page<TrainingPackage> findAll(Pageable pageable);
}
