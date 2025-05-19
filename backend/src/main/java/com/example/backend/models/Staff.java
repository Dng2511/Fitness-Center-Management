package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "staffs")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Staff extends BaseModel{

    @Column(name = "name")
    String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    User user;
}
