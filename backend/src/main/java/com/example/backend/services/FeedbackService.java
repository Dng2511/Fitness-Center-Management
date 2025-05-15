package com.example.backend.services;

import com.example.backend.dtos.FeedbackDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FeedbackService {
    public Page<FeedbackDTO> getAllFeedbacks(Pageable pageable);

    public FeedbackDTO getFeedbackById(Long id);

    public FeedbackDTO saveFeedback(JsonNode data);

    public FeedbackDTO updateFeedback(JsonNode data, Long id);

    public void deleteFeedback(Long id);
}
