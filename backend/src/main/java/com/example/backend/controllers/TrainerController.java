package com.example.backend.controllers;

import com.example.backend.dtos.MemberDTO;
import com.example.backend.dtos.TrainerDTO;
import com.example.backend.services.TrainerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trainers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@PreAuthorize("hasRole('ADMIN')" + " or hasRole('STAFF')")
public class TrainerController {
    TrainerService trainerService;

    @GetMapping
    public ResponseEntity<?> getAllTrainers(@RequestParam(value = "page", defaultValue = "1") int page,
                                            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        PageRequest pageable = PageRequest.of(page - 1, limit);

        return ResponseEntity.ok(trainerService.getAllTrainers(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTrainerById(@PathVariable("id") Long id) {
        TrainerDTO trainerDTO = trainerService.getTrainerById(id);
        return ResponseEntity.ok(trainerDTO);
    }
}
