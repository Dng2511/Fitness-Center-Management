package com.example.backend.dtos;

import com.example.backend.models.Equipment;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@JsonPropertyOrder({
        "id",
        "equipment_name",
        "import_date",
        "warranty",
        "origin",
        "status",
        "room"
})
public class EquipmentDTO {
    @JsonProperty("id")
    private Long equipmentId;

    @JsonProperty("equipment_name")
    private String equipmentName;

    private LocalDate importDate;

    private String warranty;

    private String origin;

    private String status;

    private RoomDTO room;

    public static EquipmentDTO fromEntity(Equipment equipment) {
        return new EquipmentDTO(
                equipment.getId(),
                equipment.getEquipmentName(),
                equipment.getImportDate(),
                equipment.getWarranty(),
                equipment.getOrigin(),
                equipment.getStatus(),
                RoomDTO.fromEntity(equipment.getRoom())
        );
    }
}


