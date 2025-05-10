package com.example.backend.services;

import com.example.backend.dtos.SubscriptionDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SubscriptionService {
    public String createOrRenewSubscription(JsonNode supcriptionData);

    public Page<SubscriptionDTO> getAllSubscriptions(Pageable pageable);

    public SubscriptionDTO getSubscriptionById(Long id);
}
