package com.example.backend.dtos;

import com.example.backend.models.Trainer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonPropertyOrder({
        "id",
        "name",
        "phone_number",
        "specialty",
        "user_id"
})
public class TrainerDTO {
    Long id;

    String name;

    @JsonProperty("phone_number")
    @Size(min = 10, message = "Phone number must be at least 10 characters long")
    String phoneNumber;

    String specialty;

    @JsonProperty("username")
    String username;

    public static TrainerDTO fromEntity(Trainer trainer) {
        return new TrainerDTO(
                trainer.getId(),
                trainer.getName(),
                trainer.getPhoneNumber(),
                trainer.getSpecialty(),
                trainer.getUser() != null ? trainer.getUser().getUsername() : null
        );
    }
}
