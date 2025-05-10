package com.example.backend.dtos;

import com.example.backend.models.Room;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
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
    private Long roomId;

    @JsonProperty("room_name")
    private String roomName;

    private String type; // dùng String để chuyển enum sang tên

    private String status;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    public static RoomDTO fromEntity(Room room) {
        return new RoomDTO(
                room.getId(),
                room.getRoomName(),
                room.getType().name(), // enum to string
                room.getStatus().name(),
                room.getCreatedAt(),
                room.getUpdatedAt()
        );
    }
}