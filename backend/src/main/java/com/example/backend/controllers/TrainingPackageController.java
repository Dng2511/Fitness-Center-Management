package com.example.backend.controllers;

import com.example.backend.dtos.TrainingPackageDTO;
import com.example.backend.services.TrainingPackageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/packages")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrainingPackageController {
    TrainingPackageService trainingPackageService;

    @GetMapping("")
    public ResponseEntity<?> getAllTrainingPackages(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit
    )
    {
        PageRequest pageable = PageRequest.of(page - 1, limit);
        Page<TrainingPackageDTO> trainingPackageDTOPage = trainingPackageService.getAllTrainingPackages(pageable);

        return ResponseEntity.ok(trainingPackageDTOPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTrainingPackageById(@PathVariable("id") Long id) {
            TrainingPackageDTO trainingPackageDTO = trainingPackageService.getTrainingPackageById(id);
            return ResponseEntity.ok(trainingPackageDTO);
    }

    @PostMapping("")
    public ResponseEntity<?> addTrainingPackage(@RequestBody TrainingPackageDTO trainingPackageDTO) {
            TrainingPackageDTO createdTrainingPackage = trainingPackageService.addTrainingPackage(trainingPackageDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTrainingPackage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTrainingPackage(
            @PathVariable("id") Long id,
            @RequestBody TrainingPackageDTO trainingPackageDTO
    ) {
            TrainingPackageDTO updatedTrainingPackage = trainingPackageService.updateTrainingPackage(id, trainingPackageDTO);
            return ResponseEntity.ok(updatedTrainingPackage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrainingPackage(@PathVariable("id") Long id) {
            TrainingPackageDTO deletedTrainingPackage = trainingPackageService.deleteTrainingPackage(id);
            return ResponseEntity.ok(deletedTrainingPackage);
    }
}
