package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

import com.example.backend.models.Member;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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

    private Long id;

    private String name;

    @JsonProperty("phone_number")
    private String phoneNumber;

    private LocalDate birthday;
    private String address;

    @JsonProperty("package_id")
    private Long trainingPackageId;

    @JsonProperty("user_id")
    private Long userId;

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

