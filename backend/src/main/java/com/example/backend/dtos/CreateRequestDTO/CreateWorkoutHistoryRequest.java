package com.example.backend.dtos.CreateRequestDTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateWorkoutHistoryRequest {
    @JsonProperty("member_id")
    Long memberId;

    @JsonProperty("workout_date")
    LocalDate workoutDate;

    String note;
}