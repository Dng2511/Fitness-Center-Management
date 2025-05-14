package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "training_packages")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TrainingPackage extends BaseModel {

    @Column(name = "package_name")
    String packageName;

    @Column(name = "duration_months") // ví dụ: 3, 6, 12 tháng
    Integer durationMonths;

    @Column(name = "price")
    Double price;

    @Column(name = "type") // theo buổi, tháng, năm, VIP
    String type;

    @OneToMany(mappedBy = "trainingPackage")
    List<Member> members;
}

