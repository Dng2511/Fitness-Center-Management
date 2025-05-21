package com.example.backend.controllers;

import com.example.backend.dtos.StaffDTO;
import com.example.backend.services.StaffService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/staffs")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StaffController {
    StaffService staffService;

    @GetMapping
    public ResponseEntity<?> getAllStaff(@RequestParam(value = "page", defaultValue = "1") int page,
                                            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        PageRequest pageable = PageRequest.of(page - 1, limit);

        return ResponseEntity.ok(staffService.getAllStaff(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable("id") Long id) {
        StaffDTO staffDTO = staffService.getStaffById(id);

        return ResponseEntity.ok(staffDTO);
    }
}
