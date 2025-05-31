package com.example.backend.models;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "members")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Member extends BaseModel {

    @Column(name = "name")
    String name;

    @Column(name = "phone_number")
    String phoneNumber;

    @Column(name = "birthday")
    LocalDate birthday;

    @Column(name = "address")
    String address;

    @OneToMany(mappedBy = "member")
    List<WorkoutHistory> workoutHistories;

    @ManyToOne
    @JoinColumn(name = "package_id")
    TrainingPackage trainingPackage;

    @Column(name = "package_start_date")
    LocalDate packageStartDate;

    @Column(name = "package_end_date")
    LocalDate packageEndDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    User user;

    @OneToMany(mappedBy = "member")
    List<Payment> payments;
}
