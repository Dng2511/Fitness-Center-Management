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
@Table(name = "workout_history")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkoutHistory extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "member_id")
    Member member;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    Trainer trainer;

    @Column(name = "workout_date")
    LocalDate workoutDate;

    @Column(name = "note", columnDefinition = "NVARCHAR(255)")
    String note;
}