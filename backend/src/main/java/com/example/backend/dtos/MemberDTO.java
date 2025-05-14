package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

import com.example.backend.models.Member;
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
        "phone_number",
        "birthday",
        "address",
        "package_id",
        "user_id"
})
public class MemberDTO {

    Long id;

    String name;

    @JsonProperty("phone_number")
    String phoneNumber;

    LocalDate birthday;
    String address;

    @JsonProperty("package_id")
    Long trainingPackageId;

    @JsonProperty("user_id")
    Long userId;

    public static MemberDTO fromEntity(Member member) {
        return new MemberDTO(
                member.getId(),
                member.getName(),
                member.getPhoneNumber(),
                member.getBirthday(),
                member.getAddress(),
                member.getTrainingPackage() != null ? member.getTrainingPackage().getId() : null,
                member.getUser() != null ? member.getUser().getId() : null
        );
    }
}

