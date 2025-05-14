package com.example.backend.services.implement;

import com.example.backend.dtos.TrainingPackageDTO;
import com.example.backend.models.TrainingPackage;
import com.example.backend.repositories.TrainingPackageRepository;
import com.example.backend.services.TrainingPackageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrainingPackageServiceImpl implements TrainingPackageService {
    TrainingPackageRepository trainingPackageRepository;


    @Override
    public Page<TrainingPackageDTO> getAllTrainingPackages(Pageable pageable) {
        return trainingPackageRepository.findAll(pageable).map(TrainingPackageDTO::fromEntity);
    }

    @Override
    public TrainingPackageDTO getTrainingPackageById(Long id) {
        return TrainingPackageDTO.fromEntity(Objects.requireNonNull(trainingPackageRepository.findById(id).orElseThrow(() -> new RuntimeException("Training package not found with id: " + id))));
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
        TrainingPackage trainingPackage = trainingPackageRepository.findById(id).orElseThrow(() -> new RuntimeException("Training package not found with id: " + id));

        if (trainingPackageDTO.getPackageName() != null) trainingPackage.setPackageName(trainingPackageDTO.getPackageName());
        if (trainingPackageDTO.getDuration() != null) trainingPackage.setDurationMonths(trainingPackageDTO.getDuration());
        if (trainingPackageDTO.getPrice() != null) trainingPackage.setPrice(trainingPackageDTO.getPrice());
        if (trainingPackageDTO.getType() != null) trainingPackage.setType(trainingPackageDTO.getType());

        return TrainingPackageDTO.fromEntity(trainingPackageRepository.save(trainingPackage));
    }

    @Override
    public TrainingPackageDTO deleteTrainingPackage(Long id) {
        TrainingPackage trainingPackage = trainingPackageRepository.findById(id).orElseThrow(() -> new RuntimeException("Training package not found with id: " + id));

        if (!trainingPackage.getMembers().isEmpty()) {
            throw new IllegalStateException(
                    "Cannot delete training package because it is being used by " +
                    trainingPackage.getMembers().size() + " member(s)"
            );
        }

        trainingPackageRepository.delete(trainingPackage);

        return TrainingPackageDTO.fromEntity(trainingPackage);
    }
}
