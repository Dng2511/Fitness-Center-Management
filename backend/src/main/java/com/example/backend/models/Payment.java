package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "payments")
@Entity
public class Payment extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "member_id")
    Member member;

    @ManyToOne
    @JoinColumn(name = "package_id")
    TrainingPackage trainingPackage;

    @Column(name = "transaction_code")
    String transactionCode;

    @Column(name = "amount", nullable = false)
    Double amount;

    @Column(name = "status", nullable = false)
    String status;

    @Column(name = "payment_date", nullable = false)
    LocalDateTime paymentDate;
}