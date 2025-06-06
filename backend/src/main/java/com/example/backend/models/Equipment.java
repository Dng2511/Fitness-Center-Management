package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "equipment")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Equipment extends BaseModel {

    @Column(name = "equipment_name", columnDefinition = "NVARCHAR(255)")
    String equipmentName;

    @Column(name = "import_date")
    LocalDate importDate;

    @Column(name = "warranty", columnDefinition = "NVARCHAR(255)")
    String warranty;

    @Column(name = "origin", columnDefinition = "NVARCHAR(255)")
    String origin;

    @Column(name = "status")
    String status;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;
}
