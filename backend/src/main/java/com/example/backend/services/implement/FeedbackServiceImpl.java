package com.example.backend.services.implement;

import com.example.backend.dtos.FeedbackDTO;
import com.example.backend.models.Feedback;
import com.example.backend.models.enums.FeedbackType;
import com.example.backend.repositories.FeedbackRepository;
import com.example.backend.repositories.MemberRepository;
import com.example.backend.services.FeedbackService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final MemberRepository memberRepository;

    @Override
    public Page<FeedbackDTO> getAllFeedbacks(Pageable pageable) {
        return feedbackRepository.findAll(pageable).map(FeedbackDTO::fromEntity);
    }

    @Override
    public FeedbackDTO getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        return FeedbackDTO.fromEntity(feedback);
    }

    @Override
    public FeedbackDTO saveFeedback(JsonNode data) {
        Feedback feedback = new Feedback();
        feedback.setType(FeedbackType.valueOf(data.get("type").asText(null)));
        feedback.setTargetId(data.get("target_id").asLong());
        feedback.setRating(data.get("rating").asInt());
        feedback.setContent(data.get("content").asText());
        feedback.setMember(memberRepository.findById(data.get("member_id").asLong()).orElseThrow(() -> new RuntimeException("Member not found")));
        return FeedbackDTO.fromEntity(feedbackRepository.save(feedback));
    }

    @Override
    public FeedbackDTO updateFeedback(JsonNode data, Long id) {
        Feedback feedback = feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedback.setType(FeedbackType.valueOf(data.get("type").asText(null)));
        feedback.setTargetId(data.get("target_id").asLong());
        feedback.setRating(data.get("rating").asInt());
        feedback.setContent(data.get("content").asText());
        feedback.setMember(memberRepository.findById(data.get("member_id").asLong()).orElseThrow(() -> new RuntimeException("Member not found")));
        return FeedbackDTO.fromEntity(feedbackRepository.save(feedback));
    }

    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}
