package com.example.backend.services;

import com.example.backend.dtos.EquipmentDTO;
import com.example.backend.dtos.RoomDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoomService {
    List<RoomDTO> getRooms();

    RoomDTO getRoomById(long id);

    List<EquipmentDTO> getEquipments(Long id);

    RoomDTO createRoom(RoomDTO roomDTO);

    RoomDTO updateRoom(RoomDTO roomDTO, long id);

    String deleteRoom(long id);
}
