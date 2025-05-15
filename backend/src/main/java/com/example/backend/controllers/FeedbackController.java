package com.example.backend.controllers;

import com.example.backend.dtos.FeedbackDTO;
import com.example.backend.services.FeedbackService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedbacks")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FeedbackController {
    private final FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<Page<FeedbackDTO>> getAllFeedbacks(@RequestParam(value = "page", defaultValue = "1") int page,
                                                              @RequestParam(value = "limit", defaultValue = "10") int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        return ResponseEntity.ok(feedbackService.getAllFeedbacks(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedbackDTO> getFeedbackById(@PathVariable Long id) {
        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
    }

    @PostMapping
    public ResponseEntity<FeedbackDTO> saveFeedback(@RequestBody JsonNode data) {
        return ResponseEntity.ok(feedbackService.saveFeedback(data));
    }

    @PutMapping("/id")
    public ResponseEntity<FeedbackDTO> updateFeedback(@RequestBody JsonNode data, @PathVariable Long id) {
        return ResponseEntity.ok(feedbackService.updateFeedback(data, id));
    }

    @DeleteMapping("/id")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.ok().build();
    }

}
