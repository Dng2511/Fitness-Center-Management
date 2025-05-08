package com.example.backend.services;

import com.example.backend.dtos.TrainingPackageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TrainingPackageService {
    Page<TrainingPackageDTO> getAllTrainingPackages(Pageable pageable);

    TrainingPackageDTO getTrainingPackageById(Long id);

    TrainingPackageDTO addTrainingPackage(TrainingPackageDTO trainingPackageDTO);

    TrainingPackageDTO updateTrainingPackage(Long id, TrainingPackageDTO trainingPackageDTO);

    TrainingPackageDTO deleteTrainingPackage(Long id);
}
