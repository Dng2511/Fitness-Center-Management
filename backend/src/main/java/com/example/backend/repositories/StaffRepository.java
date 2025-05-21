package com.example.backend.repositories;

import com.example.backend.models.Staff;
import com.example.backend.models.Trainer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    @Override
    Page<Staff> findAll(Pageable pageable);
}
