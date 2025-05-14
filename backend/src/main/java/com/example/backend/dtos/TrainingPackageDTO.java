package com.example.backend.dtos;

import com.example.backend.models.TrainingPackage;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
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
        "package_name",
        "duration",
        "price",
        "type",
        "createdAt",
        "updatedAt"
})
public class TrainingPackageDTO {
    @JsonProperty("id")
    Long id;

    @JsonProperty("package_name")
    String packageName;

    Integer duration; // ví dụ: 3, 6, 12 tháng

    Double price;

    String type; // theo buổi, tháng, năm, VIP

    public static TrainingPackageDTO fromEntity(TrainingPackage trainingPackage) {
        return new TrainingPackageDTO(
                trainingPackage.getId(),
                trainingPackage.getPackageName(),
                trainingPackage.getDurationMonths(),
                trainingPackage.getPrice(),
                trainingPackage.getType()
        );
    }
}
