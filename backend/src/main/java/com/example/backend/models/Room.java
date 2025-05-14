package com.example.backend.models;

import com.example.backend.models.enums.RoomStatus;
import com.example.backend.models.enums.RoomType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "rooms")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Room extends BaseModel {

    @Column(name = "room_name")
    String roomName;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type")
    RoomType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    RoomStatus status;

    @OneToMany(mappedBy = "room")
    List<Equipment> equipmentList;
}

