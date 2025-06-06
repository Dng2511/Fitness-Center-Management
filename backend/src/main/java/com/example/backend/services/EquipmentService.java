package com.example.backend.services;

import com.example.backend.dtos.EquipmentDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EquipmentService {
    Page<EquipmentDTO> getAllEquipment(Pageable pageable);

    EquipmentDTO getEquipmentById(Long id);

    Page<EquipmentDTO> searchEquipments(String search, Pageable pageable);

    String addEquipment(JsonNode equipmentData);

    String updateEquipment(JsonNode equipmentData, Long id);

    String deleteEquipment(Long id);
}
