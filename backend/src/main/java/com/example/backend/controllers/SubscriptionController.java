package com.example.backend.controllers;


import com.example.backend.dtos.SubscriptionDTO;
import com.example.backend.services.SubscriptionService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<Page<SubscriptionDTO>> getAllEquipments(@RequestParam(value = "page", defaultValue = "1") int page,
                                                                      @RequestParam(value = "limit", defaultValue = "10") int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        return ResponseEntity.ok(subscriptionService.getAllSubscriptions(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> getEquipmentById(@PathVariable Long id) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionById(id));
    }

    @PostMapping
    public ResponseEntity<String> addEquipment(@RequestBody JsonNode data) {
        return ResponseEntity.ok(subscriptionService.createOrRenewSubscription(data));
    }

}
