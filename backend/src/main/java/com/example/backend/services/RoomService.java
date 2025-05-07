package com.example.backend.services;

import com.example.backend.dtos.RoomDTO;

import java.util.List;

public interface RoomService {
    List<RoomDTO> getRooms();

    RoomDTO getRoomById(long id);

    RoomDTO createRoom(RoomDTO roomDTO);

    RoomDTO updateRoom(RoomDTO roomDTO, long id);

    String deleteRoom(long id);
}
