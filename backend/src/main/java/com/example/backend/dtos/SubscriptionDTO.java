package com.example.backend.dtos;

import com.example.backend.models.Subscription;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
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
    private Long id;
    private MemberDTO member;

    @JsonProperty("training_package")
    private TrainingPackageDTO trainingPackage;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private LocalDate renewalDate;
    @JsonProperty("created_at")
    private LocalDateTime createdAt;
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

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
