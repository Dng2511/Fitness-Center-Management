
package com.example.backend.controllers;

import com.example.backend.dtos.FeedbackDTO;
import com.example.backend.services.FeedbackService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class FeedbackControllerTest {

    private static final String BASE_URL = "/feedback";

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private FeedbackService feedbackService;

    @Autowired
    private ObjectMapper objectMapper;

    @InjectMocks
    private FeedbackController feedbackController;

    private FeedbackDTO testFeedback;
    private List<FeedbackDTO> feedbackList;

    @BeforeEach
    void setUp() {
        setupAuthentication();
        setupTestData();
    }

    private void setupAuthentication() {
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_MEMBER"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                "testMember", null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void setupTestData() {
        testFeedback = createFeedbackDTO(1L, 5, "Great facilities and trainers!");

        feedbackList = new ArrayList<>();
        feedbackList.add(testFeedback);
        feedbackList.add(createFeedbackDTO(2L, 4, "Good experience overall"));
    }

    private FeedbackDTO createFeedbackDTO(Long id, Integer rating, String content) {
        FeedbackDTO feedback = new FeedbackDTO();
        feedback.setId(id);
        feedback.setRating(rating);
        feedback.setContent(content);
        return feedback;
    }

    @Test
    @DisplayName("Should return all feedback with pagination")
    void getAllFeedback_ShouldReturnAllFeedbackWithPagination() throws Exception {
        Page<FeedbackDTO> feedbackPage = new PageImpl<>(
                feedbackList, PageRequest.of(0, 10), feedbackList.size());
        when(feedbackService.getAllFeedbacks(any(PageRequest.class))).thenReturn(feedbackPage);

        mockMvc.perform(get(BASE_URL)
                        .param("page", "1")
                        .param("limit", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].rating").value(5));

        verify(feedbackService, times(1)).getAllFeedbacks(any(PageRequest.class));
    }

    @Test
    @DisplayName("Should return feedback by ID")
    void getFeedbackById_ShouldReturnFeedbackById() throws Exception {
        when(feedbackService.getFeedbackById(1L)).thenReturn(testFeedback);

        mockMvc.perform(get(BASE_URL + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.rating").value(5))
                .andExpect(jsonPath("$.content").value("Great facilities and trainers!"));

        verify(feedbackService, times(1)).getFeedbackById(1L);
    }

    @Test
    @DisplayName("Should update feedback")
    void updateFeedback_ShouldUpdateFeedback() throws Exception {
        FeedbackDTO updateDTO = createFeedbackDTO(1L, 4, "Updated feedback");
        when(feedbackService.updateFeedback(any(JsonNode.class), eq(1L))).thenReturn(updateDTO);

        mockMvc.perform(put(BASE_URL + "/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.rating").value(4))
                .andExpect(jsonPath("$.content").value("Updated feedback"));

        verify(feedbackService, times(1)).updateFeedback(any(JsonNode.class), eq(1L));
    }

    @Test
    @DisplayName("Should delete feedback")
    void deleteFeedback_ShouldDeleteFeedback() throws Exception {
        doNothing().when(feedbackService).deleteFeedback(1L);

        mockMvc.perform(delete(BASE_URL + "/1"))
                .andExpect(status().isOk());

        verify(feedbackService, times(1)).deleteFeedback(1L);
    }
}