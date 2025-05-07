package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "feedback")
public class Feedback extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "content")
    private String content;

    @Column(name = "rating") // đánh giá từ 1-5 sao
    private Integer rating;

    @Column(name = "type") // feedback về nhân viên, phòng tập, thiết bị
    private String type;
}

