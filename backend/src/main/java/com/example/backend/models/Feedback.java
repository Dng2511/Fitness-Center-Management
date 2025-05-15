package com.example.backend.models;

import com.example.backend.models.enums.FeedbackType;
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

    @Column(name="target_id")
    Long targetId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    FeedbackType type;
}

