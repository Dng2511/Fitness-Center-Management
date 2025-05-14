package com.example.backend.models;

import com.example.backend.models.enums.SubscriptionStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "subscriptions")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Subscription extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    Member member;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    TrainingPackage trainingPackage;

    @Column(name = "start_date", nullable = false)
    LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    SubscriptionStatus status; // ACTIVE, EXPIRED, RENEWED

    @Column(name = "renewal_date")
    LocalDate renewalDate;

    // Getters and Setters
}


