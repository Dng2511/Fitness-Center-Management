package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Entity
@Table(name = "feedback")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Feedback extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "member_id")
    Member member;

    @Column(name = "content")
    String content;

    @Column(name = "rating") // đánh giá từ 1-5 sao
    Integer rating;

    @Column(name = "type") // feedback về nhân viên, phòng tập, thiết bị
    String type;
}

