package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@Table(name = "staffs")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Staff extends BaseModel{

    @Column(name = "name", columnDefinition = "NVARCHAR(255)")
    String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    User user;
}
