package com.example.backend.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "members")
public class Member extends BaseModel {

    @Column(name = "name")
    private String name;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "member")
    private List<WorkoutHistory> workoutHistories;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private TrainingPackage trainingPackage;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
