package com.example.backend.dtos;

import com.example.backend.models.Staff;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
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
        "user_id"
})
public class StaffDTO {
    Long id;

    String name;

    @JsonProperty("user_id")
    Long userId;

    public static StaffDTO fromEntity(Staff staff) {
        return new StaffDTO(
                staff.getId(),
                staff.getName(),
                staff.getUser() != null ? staff.getUser().getId() : null
        );
    }
}
