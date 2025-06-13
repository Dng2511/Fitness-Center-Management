package com.example.backend.controllers;

import com.example.backend.dtos.TrainingPackageDTO;
import com.example.backend.services.TrainingPackageService;
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

import java.math.BigDecimal;
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
public class TrainingPackageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private TrainingPackageService trainingPackageService;

    @Autowired
    private ObjectMapper objectMapper;

    private TrainingPackageDTO testPackageDTO;
    private List<TrainingPackageDTO> packageDTOList;

    @BeforeEach
    void setUp() {
        // Setup authentication
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
        Authentication authentication = new UsernamePasswordAuthenticationToken("testAdmin", null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Create test TrainingPackageDTO
        testPackageDTO = new TrainingPackageDTO();
        testPackageDTO.setId(1L);
        testPackageDTO.setPackageName("Gold Package");
        testPackageDTO.setDuration(12);
        testPackageDTO.setPrice(400.00);

        // Create list of TrainingPackageDTOs for pagination testing
        packageDTOList = new ArrayList<>();
        packageDTOList.add(testPackageDTO);

        TrainingPackageDTO package2 = new TrainingPackageDTO();
        package2.setId(2L);
        package2.setPackageName("Silver Package");
        package2.setDuration(6);
        package2.setPrice(200.00);
        packageDTOList.add(package2);
    }

    @Test
    @DisplayName("Should return all packages with pagination")
    void getAllPackages_ShouldReturnAllPackagesWithPagination() throws Exception {
        Page<TrainingPackageDTO> packagePage = new PageImpl<>(packageDTOList, PageRequest.of(0, 10), packageDTOList.size());
        when(trainingPackageService.getAllTrainingPackages(any(PageRequest.class))).thenReturn(packagePage);

        mockMvc.perform(get("/packages")
                        .param("page", "1")
                        .param("limit", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Gold Package"));

        verify(trainingPackageService, times(1)).getAllTrainingPackages(any(PageRequest.class));
    }

    @Test
    @DisplayName("Should return package by ID")
    void getPackageById_ShouldReturnPackageById() throws Exception {
        when(trainingPackageService.getTrainingPackageById(1L)).thenReturn(testPackageDTO);

        mockMvc.perform(get("/packages/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Gold Package"))
                .andExpect(jsonPath("$.durationInMonths").value(12));

        verify(trainingPackageService, times(1)).getTrainingPackageById(1L);
    }

    @Test
    @DisplayName("Should create new package")
    void createPackage_ShouldCreateNewPackage() throws Exception {
        when(trainingPackageService.addTrainingPackage(any(TrainingPackageDTO.class))).thenReturn(testPackageDTO);

        mockMvc.perform(post("/packages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testPackageDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Gold Package"));

        verify(trainingPackageService, times(1)).addTrainingPackage(any(TrainingPackageDTO.class));
    }

    @Test
    @DisplayName("Should update package")
    void updatePackage_ShouldUpdatePackage() throws Exception {
        TrainingPackageDTO updateDTO = new TrainingPackageDTO();
        updateDTO.setId(1L);
        updateDTO.setPackageName("Premium Gold Package");
        updateDTO.setDuration(24);
        updateDTO.setPrice(400.00);
        when(trainingPackageService.getTrainingPackageById(1L)).thenReturn(testPackageDTO);

        when(trainingPackageService.updateTrainingPackage(eq(1L), any(TrainingPackageDTO.class))).thenReturn(updateDTO);

        mockMvc.perform(put("/packages/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Premium Gold Package"))
                .andExpect(jsonPath("$.durationInMonths").value(24));

        verify(trainingPackageService, times(1)).updateTrainingPackage(eq(1L), any(TrainingPackageDTO.class));
    }

    @Test
    @DisplayName("Should delete package")
    void deletePackage_ShouldDeletePackage() throws Exception {
        when(trainingPackageService.deleteTrainingPackage(1L)).thenReturn(testPackageDTO);

        mockMvc.perform(delete("/packages/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Gold Package"));

        verify(trainingPackageService, times(1)).deleteTrainingPackage(1L);
    }
}