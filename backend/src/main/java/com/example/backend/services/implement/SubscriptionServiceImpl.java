package com.example.backend.services.implement;

import com.example.backend.dtos.SubscriptionDTO;
import com.example.backend.models.Member;
import com.example.backend.models.Subscription;
import com.example.backend.models.SubscriptionStatus;
import com.example.backend.models.TrainingPackage;
import com.example.backend.repositories.MemberRepository;
import com.example.backend.repositories.SubscriptionRepository;
import com.example.backend.repositories.TrainingPackageRepository;
import com.example.backend.services.SubscriptionService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final MemberRepository memberRepository;
    private final TrainingPackageRepository trainingPackageRepository;

    public String createOrRenewSubscription(JsonNode subscriptionData) {
        Member member = memberRepository.findById(subscriptionData.get("member_id").asLong())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        TrainingPackage trainingPackage = trainingPackageRepository.findById(subscriptionData.get("package_id").asLong())
                .orElseThrow(() -> new RuntimeException("Package not found"));

        // Tính ngày kết thúc
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusMonths(trainingPackage.getDurationMonths());
        boolean isRenewal = subscriptionData.get("is_renewal").asBoolean();

        Subscription subscription = new Subscription();
        subscription.setMember(member);
        subscription.setTrainingPackage(trainingPackage);
        subscription.setStartDate(startDate);
        subscription.setEndDate(endDate);
        subscription.setStatus(isRenewal ? SubscriptionStatus.RENEWED : SubscriptionStatus.ACTIVE);
        subscription.setRenewalDate(isRenewal ? LocalDate.now() : null);

        subscriptionRepository.save(subscription);
        return isRenewal ? "renewed successfully" : "active successfully";
    }

    @Override
    public Page<SubscriptionDTO> getAllSubscriptions(Pageable pageable) {
        return subscriptionRepository.findAll(pageable).map(SubscriptionDTO::fromEntity);
    }

    @Override
    public SubscriptionDTO getSubscriptionById(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        return SubscriptionDTO.fromEntity(subscription);
    }

    @Scheduled(cron = "0 0 0 * * ?") // Chạy hàng ngày lúc 00:00
    public void updateExpiredSubscriptions() {
        List<Subscription> activeSubscriptions = subscriptionRepository.findByStatus(SubscriptionStatus.ACTIVE);
        LocalDate today = LocalDate.now();

        for (Subscription subscription : activeSubscriptions) {
            if (subscription.getEndDate().isBefore(today)) {
                subscription.setStatus(SubscriptionStatus.EXPIRED);
            }
        }

        subscriptionRepository.saveAll(activeSubscriptions);
    }
}

