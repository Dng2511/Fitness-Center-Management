package com.example.backend.dtos;

import com.example.backend.models.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonPropertyOrder({
        "id",
        "username",
        "password",
        "role",
        "staffInfo",
        "trainerInfo",
        "memberInfo"
})
public class UserDTO {

    @JsonProperty("id")
    Long id;

    @JsonProperty("username")
    @Size(min = 3, message = "Username must be at least 3 characters long")
    String username;

    @JsonProperty("password")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    String password;

    String role;
    MemberDTO memberInfo;

    public static UserDTO fromEntity(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getRole().name(),
                user.getMemberInfo() != null ? MemberDTO.fromEntity(user.getMemberInfo()) : null
        );
    }
}
