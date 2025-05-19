package com.example.backend.models;

import com.example.backend.models.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseModel {

    @Column(unique = true, name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    //@Enumerated(EnumType.STRING)
    @Column(name = "roles")
    private String roles;

    @OneToOne(mappedBy = "user")
    private Staff staffInfo;

    @OneToOne(mappedBy = "user")
    private Trainer trainerInfo;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Member memberInfo;
}

