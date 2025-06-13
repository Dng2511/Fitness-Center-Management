package com.example.backend.controllers;

import com.example.backend.dtos.WorkoutHistoryDTO;
import com.example.backend.services.WorkoutHistoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class WorkoutHistoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private WorkoutHistoryService workoutHistoryService;

    @Autowired
    private ObjectMapper objectMapper;

    private WorkoutHistoryDTO testWorkoutHistoryDTO;
    private List<WorkoutHistoryDTO> workoutHistoryDTOList;

    @BeforeEach
    void setUp() {
        // Setup authentication
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_MEMBER"));
        Authentication authentication = new UsernamePasswordAuthenticationToken("testMember", null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Create test WorkoutHistoryDTO
        testWorkoutHistoryDTO = new WorkoutHistoryDTO();
        testWorkoutHistoryDTO.setId(1L);
        testWorkoutHistoryDTO.setMemberId(1L);
        testWorkoutHistoryDTO.setTrainerId(2L);
        testWorkoutHistoryDTO.setWorkoutDate(LocalDate.from(LocalDateTime.now()));
        testWorkoutHistoryDTO.setNote("Cardio and strength training");

        // Create list of WorkoutHistoryDTOs for pagination testing
        workoutHistoryDTOList = new ArrayList<>();
        workoutHistoryDTOList.add(testWorkoutHistoryDTO);

        WorkoutHistoryDTO history2 = new WorkoutHistoryDTO();
        history2.setId(2L);
        history2.setMemberId(1L);
        history2.setTrainerId(3L);
        history2.setWorkoutDate(LocalDate.from(LocalDateTime.now().minusDays(1)));
        history2.setNote("Yoga and flexibility training");
        workoutHistoryDTOList.add(history2);
    }

    @Test
    @DisplayName("Should return all workout history with pagination")
    void getAllWorkoutHistory_ShouldReturnAllWorkoutHistoryWithPagination() throws Exception {
        // Arrange
        int pageNumber = 0;
        int pageSize = 10;
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        Page<WorkoutHistoryDTO> expectedHistoryPage = new PageImpl<>(
                workoutHistoryDTOList,
                pageRequest,
                workoutHistoryDTOList.size()
        );

        List<WorkoutHistoryDTO> expectedHistoryList = new ArrayList<>(workoutHistoryDTOList);

        when(workoutHistoryService.getMyWorkoutHistories()).thenReturn(expectedHistoryList);

        mockMvc.perform(get("/workout-history")
                        .param("page", "1")
                        .param("limit", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].memberId").value(1));

        verify(workoutHistoryService, times(1)).getMyWorkoutHistories();
    }

    @Test
    @DisplayName("Should create new workout history")
    void createWorkoutHistory_ShouldCreateNewWorkoutHistory() throws Exception {
        when(workoutHistoryService.createWorkoutHistory(any())).thenReturn(testWorkoutHistoryDTO);

        mockMvc.perform(post("/workout-history")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testWorkoutHistoryDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.memberId").value(1));

        verify(workoutHistoryService, times(1)).createWorkoutHistory(any());
    }
}