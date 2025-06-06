package com.example.backend.repositories;

import com.example.backend.models.Equipment;
import com.example.backend.models.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    @Override
    Page<Equipment> findAll(Pageable pageable);

    @Query("SELECT e FROM Equipment e WHERE " +
            "(:search IS NULL OR e.equipmentName LIKE %:search%)")
    Page<Equipment> searchEquipments(@Param("search") String search, Pageable pageable);
}
