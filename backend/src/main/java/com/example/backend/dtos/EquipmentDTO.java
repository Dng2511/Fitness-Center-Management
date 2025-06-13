package com.example.backend.dtos;

import com.example.backend.models.Equipment;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonPropertyOrder({
        "id",
        "equipment_name",
        "import_date",
        "warranty",
        "origin",
        "status",
        "room",
        "created_at",
        "updated_at"
})
public class EquipmentDTO {
    @JsonProperty("id")
    Long equipmentId;

    @JsonProperty("equipment_name")
    String equipmentName;

    LocalDate importDate;

    String warranty;

    String origin;

    String status;

    RoomDTO room;
    @JsonProperty("created_at")
    LocalDateTime createdAt;
    @JsonProperty("updated_at")
    LocalDateTime updatedAt;

    public static EquipmentDTO fromEntity(Equipment equipment) {
        return new EquipmentDTO(
                equipment.getId(),
                equipment.getEquipmentName(),
                equipment.getImportDate(),
                equipment.getWarranty(),
                equipment.getOrigin(),
                equipment.getStatus(),
                RoomDTO.fromEntity(equipment.getRoom()),
                equipment.getCreatedAt(),
                equipment.getUpdatedAt()
        );
    }
}


