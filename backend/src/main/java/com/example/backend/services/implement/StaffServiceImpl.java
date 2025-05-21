package com.example.backend.services.implement;

import com.example.backend.dtos.StaffDTO;
import com.example.backend.models.Staff;
import com.example.backend.repositories.StaffRepository;
import com.example.backend.services.StaffService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StaffServiceImpl implements StaffService {

    StaffRepository staffRepository;

    @Override
    public Page<StaffDTO> getAllStaff(Pageable pageable) {
        return staffRepository.findAll(pageable).map(StaffDTO::fromEntity);
    }

    @Override
    public StaffDTO getStaffById(Long id) {
        return StaffDTO.fromEntity(staffRepository.findById(id).orElseThrow(() -> new RuntimeException("Staff not found with id: " + id)));
    }
}
