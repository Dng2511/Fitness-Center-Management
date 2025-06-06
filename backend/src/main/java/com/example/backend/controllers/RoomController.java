package com.example.backend.controllers;

import com.example.backend.dtos.EquipmentDTO;
import com.example.backend.dtos.RoomDTO;
import com.example.backend.services.EquipmentService;
import com.example.backend.services.RoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomController {

    RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        return ResponseEntity.ok(roomService.getRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    @GetMapping("/{id}/equipments")
    public ResponseEntity<List<EquipmentDTO>> getRoomEquipments(@PathVariable Long id) {
        return  ResponseEntity.ok(roomService.getEquipments(id));
    }

    @PostMapping
    public ResponseEntity<RoomDTO> createRoom(@RequestBody RoomDTO roomDTO) {
        return ResponseEntity.ok(roomService.createRoom(roomDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomDTO> updateRoom(@RequestBody RoomDTO roomDTO, @PathVariable Long id) {
        RoomDTO updatedRoom = roomService.updateRoom(roomDTO, id);
        return updatedRoom != null ? ResponseEntity.ok(updatedRoom) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
        String response = roomService.deleteRoom(id);
        return ResponseEntity.ok("Delete OK");
    }
}