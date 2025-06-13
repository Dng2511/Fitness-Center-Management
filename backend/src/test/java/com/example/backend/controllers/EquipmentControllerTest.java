package com.example.backend.controllers;

import com.example.backend.dtos.EquipmentDTO;
import com.example.backend.services.EquipmentService;
import com.fasterxml.jackson.databind.JsonNode;
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
public class EquipmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private EquipmentService equipmentService;

    @Autowired
    private ObjectMapper objectMapper;

    private EquipmentDTO testEquipmentDTO;
    private List<EquipmentDTO> equipmentDTOList;

    @BeforeEach
    void setUp() {
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
        Authentication authentication = new UsernamePasswordAuthenticationToken("testAdmin", null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        testEquipmentDTO = new EquipmentDTO();
        testEquipmentDTO.setEquipmentId(1L);
        testEquipmentDTO.setEquipmentName("Treadmill");
        testEquipmentDTO.setCreatedAt(LocalDateTime.now());
        testEquipmentDTO.setStatus("ACTIVE");
        testEquipmentDTO.setUpdatedAt(LocalDateTime.now());
        testEquipmentDTO.setImportDate(LocalDate.now());
        testEquipmentDTO.setWarranty("2 years");
        testEquipmentDTO.setOrigin("USA");
        testEquipmentDTO.setRoom(null);

        equipmentDTOList = new ArrayList<>();
        equipmentDTOList.add(testEquipmentDTO);

        EquipmentDTO equipment2 = new EquipmentDTO();
        equipment2.setEquipmentId(2L);
        equipment2.setEquipmentName("Bench Press");
        equipment2.setUpdatedAt(LocalDateTime.now());
        equipment2.setStatus("Active");
        equipment2.setImportDate(LocalDate.now());
        equipment2.setWarranty("1 year");
        equipment2.setOrigin("USA");
        equipment2.setRoom(null);
        equipmentDTOList.add(equipment2);
    }

    @Test
    @DisplayName("Should return all equipment with pagination")
    void getAllEquipment_ShouldReturnAllEquipmentWithPagination() throws Exception {
        Page<EquipmentDTO> equipmentPage = new PageImpl<>(equipmentDTOList, PageRequest.of(0, 10), equipmentDTOList.size());
        when(equipmentService.getAllEquipment(any(PageRequest.class))).thenReturn(equipmentPage);

        mockMvc.perform(get("/equipment")
                        .param("page", "1")
                        .param("limit", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Treadmill"));

        verify(equipmentService, times(1)).getAllEquipment(any(PageRequest.class));
    }

    @Test
    @DisplayName("Should return equipment by ID")
    void getEquipmentById_ShouldReturnEquipmentById() throws Exception {
        when(equipmentService.getEquipmentById(1L)).thenReturn(testEquipmentDTO);

        mockMvc.perform(get("/equipment/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Treadmill"));

        verify(equipmentService, times(1)).getEquipmentById(1L);
    }

    @Test
    @DisplayName("Should create new equipment")
    void createEquipment_ShouldCreateNewEquipment() throws Exception {
        when(equipmentService.addEquipment(any(com.fasterxml.jackson.databind.JsonNode.class))).thenReturn(String.valueOf(testEquipmentDTO));

        mockMvc.perform(post("/equipment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testEquipmentDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Treadmill"));

        verify(equipmentService, times(1)).addEquipment(any(com.fasterxml.jackson.databind.JsonNode.class));
    }

    @Test
    @DisplayName("Should update equipment")
    void updateEquipment_ShouldUpdateEquipment() throws Exception {
        // Arrange
        EquipmentDTO updateDTO = new EquipmentDTO();
        updateDTO.setEquipmentId(1L);
        updateDTO.setEquipmentName("Updated Treadmill");
        updateDTO.setStatus("Maintenance");
        updateDTO.setCreatedAt(LocalDateTime.now());
        updateDTO.setUpdatedAt(LocalDateTime.now());
        updateDTO.setImportDate(LocalDate.now());
        updateDTO.setWarranty("2 years");
        updateDTO.setOrigin("USA");
        updateDTO.setRoom(null);

        JsonNode equipmentDataNode = objectMapper.valueToTree(updateDTO);

        when(equipmentService.updateEquipment(any(JsonNode.class), eq(1L)))
                .thenReturn(objectMapper.writeValueAsString(testEquipmentDTO));

        mockMvc.perform(put("/equipment/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Updated Treadmill"))
                .andExpect(jsonPath("$.status").value("Maintenance"));

        verify(equipmentService, times(1)).updateEquipment(any(JsonNode.class), eq(1L));
    }


    @Test
    @DisplayName("Should delete equipment")
    void deleteEquipment_ShouldDeleteEquipment() throws Exception {
        when(equipmentService.deleteEquipment(1L)).thenReturn(String.valueOf(testEquipmentDTO));

        mockMvc.perform(delete("/equipment/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Treadmill"));

        verify(equipmentService, times(1)).deleteEquipment(1L);
    }

    @Test
    @DisplayName("Should search equipment")
    void searchEquipment_ShouldReturnMatchingEquipment() throws Exception {
        Page<EquipmentDTO> equipmentPage = new PageImpl<>(equipmentDTOList, PageRequest.of(0, 10), equipmentDTOList.size());
        when(equipmentService.searchEquipments(eq("Treadmill"), any(PageRequest.class))).thenReturn(equipmentPage);

        mockMvc.perform(get("/equipment/search")
                        .param("value", "Treadmill")
                        .param("page", "1")
                        .param("limit", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Treadmill"));

        verify(equipmentService, times(1)).searchEquipments(eq("Treadmill"), any(PageRequest.class));
    }
}