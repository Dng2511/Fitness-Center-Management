package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "trainers")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Trainer extends BaseModel {

    @Column(name = "name")
    String name;

    @Column(name = "specialty")
    String specialty;

    @Column(name = "phone_number")
    String phoneNumber;

    @OneToMany(mappedBy = "trainer")
    List<WorkoutHistory> workoutHistories;

    @OneToOne
    @JoinColumn(name = "user_id")
    User user;
}

