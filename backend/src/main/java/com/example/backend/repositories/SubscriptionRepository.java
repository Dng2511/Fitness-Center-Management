package com.example.backend.repositories;

import com.example.backend.models.Subscription;
import com.example.backend.models.SubscriptionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Page<Subscription> findAll(Pageable pageable);

    List<Subscription> findByStatus(SubscriptionStatus subscriptionStatus);
}
