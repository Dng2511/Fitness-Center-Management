package com.example.backend.services;

import com.example.backend.dtos.EquipmentDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EquipmentService {
    public Page<EquipmentDTO> getAllEquipment(Pageable pageable);

    public EquipmentDTO getEquipmentById(Long id);

    public String addEquipment(JsonNode equipmentData);

    public String updateEquipment(JsonNode equipmentData, Long id);

    public String deleteEquipment(Long id);
}
