package com.example.backend.services.implement;

import com.example.backend.dtos.TrainingPackageDTO;
import com.example.backend.models.TrainingPackage;
import com.example.backend.repositories.TrainingPackageRepository;
import com.example.backend.services.TrainingPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrainingPackageServiceImpl implements TrainingPackageService {
    private final TrainingPackageRepository trainingPackageRepository;


    @Override
    public Page<TrainingPackageDTO> getAllTrainingPackages(Pageable pageable) {
        return trainingPackageRepository.findAll(pageable).map(TrainingPackageDTO::fromEntity);
    }

    @Override
    public TrainingPackageDTO getTrainingPackageById(Long id) {
        return TrainingPackageDTO.fromEntity(Objects.requireNonNull(trainingPackageRepository.findById(id).orElse(null)));
    }

    @Override
    public TrainingPackageDTO addTrainingPackage(TrainingPackageDTO trainingPackageDTO) {
        TrainingPackage trainingPackage = new TrainingPackage();

        trainingPackage.setPackageName(trainingPackageDTO.getPackageName());
        trainingPackage.setDurationMonths(trainingPackageDTO.getDuration());
        trainingPackage.setPrice(trainingPackageDTO.getPrice());
        trainingPackage.setType(trainingPackageDTO.getType());

        return TrainingPackageDTO.fromEntity(trainingPackageRepository.save(trainingPackage));
    }

    @Override
    public TrainingPackageDTO updateTrainingPackage(Long id, TrainingPackageDTO trainingPackageDTO) {
        TrainingPackage trainingPackage = trainingPackageRepository.findById(id).orElseThrow();

        if (trainingPackageDTO.getPackageName() != null) trainingPackage.setPackageName(trainingPackageDTO.getPackageName());
        if (trainingPackageDTO.getDuration() != null) trainingPackage.setDurationMonths(trainingPackageDTO.getDuration());
        if (trainingPackageDTO.getPrice() != null) trainingPackage.setPrice(trainingPackageDTO.getPrice());
        if (trainingPackageDTO.getType() != null) trainingPackage.setType(trainingPackageDTO.getType());

        return TrainingPackageDTO.fromEntity(trainingPackageRepository.save(trainingPackage));
    }

    @Override
    public TrainingPackageDTO deleteTrainingPackage(Long id) {
        TrainingPackage trainingPackage = trainingPackageRepository.findById(id).orElseThrow();

        trainingPackageRepository.delete(trainingPackage);

        return TrainingPackageDTO.fromEntity(trainingPackage);
    }
}
