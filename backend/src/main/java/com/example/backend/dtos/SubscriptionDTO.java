package com.example.backend.dtos;

import com.example.backend.models.Subscription;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonPropertyOrder({
        "id",
        "member",
        "training_package",
        "status",
        "startDate",
        "endDate",
        "renewalDate",
        "created_at",
        "updated_at"
})
public class SubscriptionDTO {
    Long id;
    MemberDTO member;

    @JsonProperty("training_package")
    TrainingPackageDTO trainingPackage;
    LocalDate startDate;
    LocalDate endDate;
    String status;
    LocalDate renewalDate;
    @JsonProperty("created_at")
    LocalDateTime createdAt;
    @JsonProperty("updated_at")
    LocalDateTime updatedAt;

    public static SubscriptionDTO fromEntity(Subscription subscription) {
        return new SubscriptionDTO(
                subscription.getId(),
                MemberDTO.fromEntity(subscription.getMember()),
                TrainingPackageDTO.fromEntity(subscription.getTrainingPackage()),
                subscription.getStartDate(),
                subscription.getEndDate(),
                subscription.getStatus().name(),
                subscription.getRenewalDate(),
                subscription.getCreatedAt(),
                subscription.getCreatedAt()
        );
    }
}
