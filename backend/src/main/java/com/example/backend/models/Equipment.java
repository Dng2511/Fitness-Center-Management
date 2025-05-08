package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "equipment")
public class Equipment extends BaseModel {

    @Column(name = "equipment_name")
    private String equipmentName;

    @Column(name = "import_date")
    private LocalDate importDate;

    @Column(name = "warranty")
    private String warranty;

    @Column(name = "origin")
    private String origin;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
