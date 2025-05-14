package com.example.backend.services.implement;

import com.example.backend.dtos.EquipmentDTO;
import com.example.backend.dtos.RoomDTO;
import com.example.backend.models.Room;
import com.example.backend.models.enums.RoomStatus;
import com.example.backend.models.enums.RoomType;
import com.example.backend.repositories.EquipmentRepository;
import com.example.backend.repositories.RoomRepository;
import com.example.backend.services.RoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomServiceImpl implements RoomService {
    RoomRepository roomRepository;
    EquipmentRepository equipmentRepository;

    @Override
    public List<RoomDTO> getRooms() {
        return roomRepository.findAll().stream().map(RoomDTO::fromEntity).toList();
    }

    @Override
    public RoomDTO getRoomById(long id) {
        return RoomDTO.fromEntity(Objects.requireNonNull(roomRepository.findById(id).orElse(null)));
    }

    @Override
    public List<EquipmentDTO> getEquipments( Long id) {
        Room room = roomRepository.findById(id).orElse(null);
        assert room != null;
        return room.getEquipmentList().stream().map(EquipmentDTO::fromEntity).toList();
    }

    @Override
    public RoomDTO createRoom(RoomDTO roomDTO) {
        Room room = new Room();
        room.setRoomName(roomDTO.getRoomName());
        room.setType(RoomType.valueOf(roomDTO.getType().toUpperCase()));
        room.setStatus(RoomStatus.valueOf(roomDTO.getStatus().toUpperCase()));
        roomRepository.save(room);
        return null;
    }

    @Override
    public RoomDTO updateRoom(RoomDTO roomDTO, long id) {
        roomRepository.findById(id).ifPresent(room -> {
            room.setRoomName(roomDTO.getRoomName());
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
