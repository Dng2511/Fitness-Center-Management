package com.example.backend.repositories;

import com.example.backend.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Override
    List<Room> findAll();

    Optional<Room> findRoomByRoomName(String roomName);
}
