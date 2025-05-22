package com.example.backend.services.implement;

import com.example.backend.dtos.MemberDTO;
import com.example.backend.dtos.TrainerDTO;
import com.example.backend.dtos.UserDTO;
import com.example.backend.models.Trainer;
import com.example.backend.models.User;
import com.example.backend.repositories.TrainerRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.TrainerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrainerServiceImpl implements TrainerService {

    TrainerRepository trainerRepository;
    UserRepository userRepository;

    @Override
    public Page<TrainerDTO> getAllTrainers(Pageable pageable) {
        return trainerRepository.findAll(pageable).map(TrainerDTO::fromEntity);
    }

    @Override
    public TrainerDTO getTrainerById(Long id) {
        return TrainerDTO.fromEntity(trainerRepository.findById(id).orElseThrow(() -> new RuntimeException("Trainer not found with id: " + id)));
    }

    @Override
    public TrainerDTO addTrainer(TrainerDTO trainerDTO) {
        Trainer trainer = new Trainer();

        trainer.setName(trainerDTO.getName());
        trainer.setPhoneNumber(trainerDTO.getPhoneNumber());
        trainer.setSpecialty(trainerDTO.getSpecialty());

        if (trainerDTO.getUserId() != null) {
            User user = userRepository.findById(trainerDTO.getUserId()).orElseThrow(() ->
                    new RuntimeException("User not found with id: " + trainerDTO.getUserId()));
            trainer.setUser(user);
        }

        return TrainerDTO.fromEntity(trainerRepository.save(trainer));
    }

    @Override
    public TrainerDTO updateTrainer(Long id, TrainerDTO trainerDTO) {
        return null;
    }

    @Override
    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
        return null;
    }
}
