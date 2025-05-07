package com.example.backend.services.implement;

import com.example.backend.dtos.RoomDTO;
import com.example.backend.models.Room;
import com.example.backend.models.RoomStatus;
import com.example.backend.models.RoomType;
import com.example.backend.repositories.RoomRepository;
import com.example.backend.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;


    @Override
    public List<RoomDTO> getRooms() {
        return roomRepository.findAll().stream().map(RoomDTO::fromEntity).toList();
    }

    @Override
    public RoomDTO getRoomById(long id) {
        return RoomDTO.fromEntity(Objects.requireNonNull(roomRepository.findById(id).orElse(null)));
    }

    @Override
    public RoomDTO createRoom(RoomDTO roomDTO) {
        Room room = new Room();
        room.setRoomName(roomDTO.getRoom_name());
        room.setType(RoomType.valueOf(roomDTO.getType().toUpperCase()));
        room.setStatus(RoomStatus.valueOf(roomDTO.getStatus().toUpperCase()));
        roomRepository.save(room);
        return null;
    }

    @Override
    public RoomDTO updateRoom(RoomDTO roomDTO, long id) {
        roomRepository.findById(id).ifPresent(room -> {
            room.setRoomName(roomDTO.getRoom_name());
            room.setType(RoomType.valueOf(roomDTO.getType().toUpperCase()));
            room.setStatus(RoomStatus.valueOf(roomDTO.getStatus().toUpperCase()));
            roomRepository.save(room);
        });
        return null;
    }

    @Override
    public String deleteRoom(long id) {
        roomRepository.deleteById(id);
        return "Delete Room OK";
    }
}
