package com.example.backend.dtos;



import com.example.backend.models.Feedback;
import com.example.backend.models.Member;
import com.example.backend.models.Room;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonPropertyOrder({
        "id",
        "member",
        "type",
        "target_id",
        "rating",
        "content",
})
public class FeedbackDTO {

    Long id;
    MemberDTO member;
    Integer rating;
    String type;
    String content;

    @JsonProperty("target_id")
    Long targetId;

    public static FeedbackDTO fromEntity(Feedback feedback) {
        return new FeedbackDTO(
                feedback.getId(),
                MemberDTO.fromEntity(feedback.getMember()),
                feedback.getRating(),
                feedback.getType().name(),
                feedback.getContent(),
                feedback.getTargetId()
        );
    }
}