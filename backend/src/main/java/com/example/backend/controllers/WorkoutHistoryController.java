package com.example.backend.controllers;

import com.example.backend.dtos.CreateRequestDTO.CreateWorkoutHistoryRequest;
import com.example.backend.dtos.WorkoutHistoryDTO;
import com.example.backend.services.WorkoutHistoryService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workout-history")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WorkoutHistoryController {
    WorkoutHistoryService workoutHistoryService;

    @PostMapping
    public ResponseEntity<WorkoutHistoryDTO> createWorkoutHistory(@RequestBody CreateWorkoutHistoryRequest request) {
        WorkoutHistoryDTO workoutHistory = workoutHistoryService.createWorkoutHistory(request);
        return new ResponseEntity<>(workoutHistory, HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<List<WorkoutHistoryDTO>> getMyWorkoutHistories() {
        List<WorkoutHistoryDTO> workoutHistories = workoutHistoryService.getMyWorkoutHistories();
        return ResponseEntity.ok(workoutHistories);
    }
}
