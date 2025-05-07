package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "trainers")
public class Trainer extends BaseModel {

    @Column(name = "name")
    private String name;

    @Column(name = "specialty")
    private String specialty;

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToMany(mappedBy = "trainer")
    private List<WorkoutHistory> workoutHistories;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}

