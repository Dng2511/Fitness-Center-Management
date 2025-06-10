package com.example.backend.dtos;

import com.example.backend.models.WorkoutHistory;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkoutHistoryDTO {
    Long id;
    Long memberId;
    Long trainerId;
    LocalDate workoutDate;
    String note;

    public static WorkoutHistoryDTO fromEntity(WorkoutHistory workoutHistory) {
        return new WorkoutHistoryDTO(
                workoutHistory.getId(),
                workoutHistory.getMember() != null ? workoutHistory.getMember().getId() : null,
                workoutHistory.getTrainer() != null ? workoutHistory.getTrainer().getId() : null,
                workoutHistory.getWorkoutDate() != null ? workoutHistory.getWorkoutDate() : null,
                workoutHistory.getNote()
        );
    }
}
