package com.example.backend.repositories;

import com.example.backend.models.Equipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    @Override
    Page<Equipment> findAll(Pageable pageable);
}
