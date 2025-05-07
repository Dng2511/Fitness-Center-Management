package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends BaseModel {

    @Column(unique = true, name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private UserRole role;

    @OneToOne(mappedBy = "user")
    private Staff staffInfo;

    @OneToOne(mappedBy = "user")
    private Trainer trainerInfo;

    @OneToOne(mappedBy = "user")
    private Member memberInfo;

    // Getters & Setters
}

