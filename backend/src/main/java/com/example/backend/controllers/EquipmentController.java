package com.example.backend.controllers;

import com.example.backend.dtos.EquipmentDTO;
import com.example.backend.services.EquipmentService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/equipments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@PreAuthorize("hasRole('ADMIN')" + " or hasRole('STAFF')")
public class EquipmentController {
    EquipmentService equipmentService;

    @GetMapping
    public ResponseEntity<Page<EquipmentDTO>> getAllEquipments(@RequestParam(value = "page", defaultValue = "1") int page,
                                                              @RequestParam(value = "limit", defaultValue = "10") int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        return ResponseEntity.ok(equipmentService.getAllEquipment(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipmentDTO> getEquipmentById(@PathVariable Long id) {
        return ResponseEntity.ok(equipmentService.getEquipmentById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<EquipmentDTO>> searchEquipments(@RequestParam(value = "value", required = false) String search,
                                                               @RequestParam(value = "page", defaultValue = "1") int page,
                                                               @RequestParam(value = "limit", defaultValue = "10") int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        return ResponseEntity.ok(equipmentService.searchEquipments(search, pageable));
    }

    @PostMapping
    public ResponseEntity<String> addEquipment(@RequestBody JsonNode data) {
        return ResponseEntity.ok(equipmentService.addEquipment(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateEquipment(@RequestBody JsonNode data, @PathVariable Long id) {
        return ResponseEntity.ok(equipmentService.updateEquipment(data, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEquipmentById( @PathVariable Long id) {
        return ResponseEntity.ok(equipmentService.deleteEquipment(id));
    }
}
