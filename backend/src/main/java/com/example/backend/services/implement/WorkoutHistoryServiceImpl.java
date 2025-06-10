package com.example.backend.services.implement;

import com.example.backend.dtos.CreateRequestDTO.CreateWorkoutHistoryRequest;
import com.example.backend.dtos.WorkoutHistoryDTO;
import com.example.backend.models.Member;
import com.example.backend.models.Trainer;
import com.example.backend.models.User;
import com.example.backend.models.WorkoutHistory;
import com.example.backend.repositories.MemberRepository;
import com.example.backend.repositories.TrainerRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.repositories.WorkoutHistoryRepository;
import com.example.backend.services.WorkoutHistoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WorkoutHistoryServiceImpl implements WorkoutHistoryService {
    WorkoutHistoryRepository workoutHistoryRepository;
    MemberRepository memberRepository;
    TrainerRepository trainerRepository;
    UserRepository userRepository;

    @Override
    @PreAuthorize("hasRole('TRAINER')")
    public WorkoutHistoryDTO createWorkoutHistory(CreateWorkoutHistoryRequest request) {
        Trainer currentTrainer = getCurrentLoggedInTrainer();
        if (currentTrainer == null) {
            throw new RuntimeException("Not logged in as a trainer");
        }

        Member member = memberRepository.findById(request.getMemberId())
                .orElseThrow(() -> new RuntimeException("Not found user with id = " + request.getMemberId()));

        WorkoutHistory workoutHistory = new WorkoutHistory();
        workoutHistory.setMember(member);
        workoutHistory.setTrainer(currentTrainer);
        workoutHistory.setWorkoutDate(request.getWorkoutDate() != null ? request.getWorkoutDate() : LocalDate.now());
        workoutHistory.setNote(request.getNote());

        WorkoutHistory savedWorkoutHistory = workoutHistoryRepository.save(workoutHistory);

        return WorkoutHistoryDTO.fromEntity(savedWorkoutHistory);
    }

    @Override
    public List<WorkoutHistoryDTO> getMyWorkoutHistories() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Not found user with username = " + username));

        List<WorkoutHistory> workoutHistories;

        if (user.getRoles().name().equals("TRAINER")) {
            Trainer trainer = trainerRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Cannot find the trainer for " + username));

            workoutHistories = workoutHistoryRepository.findByTrainerIdOrderByWorkoutDateDesc(trainer.getId());
        } else if (user.getRoles().name().equals("MEMBER")) {
            Member member = memberRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Cannot find the member for " + username));

            workoutHistories = workoutHistoryRepository.findByMemberIdOrderByWorkoutDateDesc(member.getId());
        } else {
            throw new RuntimeException("get out you admin & staff, this is not for you XD lmao");
        }

        return workoutHistories.stream()
                .map(WorkoutHistoryDTO::fromEntity)
                .collect(Collectors.toList());
    }

    private Trainer getCurrentLoggedInTrainer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            return null;
        }

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Not found user with username " + username));

        return trainerRepository.findByUserId(user.getId())
                .orElse(null);
    }
}
