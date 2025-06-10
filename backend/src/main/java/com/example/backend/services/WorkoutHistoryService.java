package com.example.backend.services;

import com.example.backend.dtos.CreateRequestDTO.CreateWorkoutHistoryRequest;
import com.example.backend.dtos.WorkoutHistoryDTO;

import java.util.List;

public interface WorkoutHistoryService {
    WorkoutHistoryDTO createWorkoutHistory(CreateWorkoutHistoryRequest request);

    List<WorkoutHistoryDTO> getMyWorkoutHistories();
}
