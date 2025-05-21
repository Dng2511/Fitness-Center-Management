package com.example.backend.services;

import com.example.backend.dtos.TrainerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TrainerService {
    Page<TrainerDTO> getAllTrainers(Pageable pageable);

    TrainerDTO getTrainerById(Long id);

    TrainerDTO addTrainer(TrainerDTO trainerDTO);

    TrainerDTO updateTrainer(Long id, TrainerDTO trainerDTO);

    TrainerDTO deleteTrainer(Long id);
}
