package com.example.backend.services;

import com.example.backend.dtos.StaffDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StaffService {
    Page<StaffDTO> getAllStaff(Pageable pageable);

    StaffDTO getStaffById(Long id);
}
