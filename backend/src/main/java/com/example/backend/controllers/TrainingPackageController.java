package com.example.backend.controllers;

import com.example.backend.dtos.TrainingPackageDTO;
import com.example.backend.services.TrainingPackageService;
import lombok.RequiredArgsConstructor;
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
public class TrainingPackageController {
    private final TrainingPackageService trainingPackageService;

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
        try {
            TrainingPackageDTO trainingPackageDTO = trainingPackageService.getTrainingPackageById(id);
            return ResponseEntity.ok(trainingPackageDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Training package not found");
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addTrainingPackage(@RequestBody TrainingPackageDTO trainingPackageDTO) {
        try {
            TrainingPackageDTO createdTrainingPackage = trainingPackageService.addTrainingPackage(trainingPackageDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTrainingPackage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create training package");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTrainingPackage(
            @PathVariable("id") Long id,
            @RequestBody TrainingPackageDTO trainingPackageDTO
    ) {
        try {
            TrainingPackageDTO updatedTrainingPackage = trainingPackageService.updateTrainingPackage(id, trainingPackageDTO);
            return ResponseEntity.ok(updatedTrainingPackage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update training package");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrainingPackage(@PathVariable("id") Long id) {
        try {
            TrainingPackageDTO deletedTrainingPackage = trainingPackageService.deleteTrainingPackage(id);
            return ResponseEntity.ok(deletedTrainingPackage);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete training package: " + e.getMessage());
        }

    }
}
