package com.example.backend.dtos.CreateRequestDTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateMemberRequestDTO {
    String username;

    String password;

    String name;

    @JsonProperty("phone_number")
    @Size(min = 10, message = "Phone number must be at least 10 characters long")
    String phoneNumber;

    LocalDate birthday;

    String address;
}
