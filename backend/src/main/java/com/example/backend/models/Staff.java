package com.example.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "staffs")
public class Staff extends BaseModel{

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;


}
