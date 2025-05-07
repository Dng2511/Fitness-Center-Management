package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "training_packages")
public class TrainingPackage extends BaseModel {

    @Column(name = "package_name")
    private String packageName;

    @Column(name = "duration_months") // ví dụ: 3, 6, 12 tháng
    private Integer durationMonths;

    @Column(name = "price")
    private Double price;

    @Column(name = "type") // theo buổi, tháng, năm, VIP
    private String type;

    @OneToMany(mappedBy = "trainingPackage")
    private List<Member> members;
}

