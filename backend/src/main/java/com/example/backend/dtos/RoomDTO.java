package com.example.backend.dtos;

import com.example.backend.models.Room;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonPropertyOrder({
        "id",
        "room_name",
        "type",
        "status",
        "created_at",
        "updated_at"
})
public class RoomDTO {

    @JsonProperty("id")
    Long roomId;

    @JsonProperty("room_name")
    String roomName;

    String type; // dùng String để chuyển enum sang tên

    String status;

    @JsonProperty("created_at")
    LocalDateTime createdAt;
    @JsonProperty("updated_at")
    LocalDateTime updatedAt;

    public static RoomDTO fromEntity(Room room) {
        return new RoomDTO(
                room.getId(),
                room.getRoomName(),
                room.getType() != null ? room.getType().name() : "", // enum to string
                room.getStatus() != null ? room.getStatus().name() : "",
                room.getCreatedAt(),
                room.getUpdatedAt()
        );
    }
}