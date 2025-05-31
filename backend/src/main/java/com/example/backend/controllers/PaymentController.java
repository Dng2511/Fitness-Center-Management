package com.example.backend.controllers;

import com.example.backend.dtos.PaymentDTO;
import com.example.backend.models.Member;
import com.example.backend.models.TrainingPackage;
import com.example.backend.repositories.TrainingPackageRepository;
import com.example.backend.services.MemberService;
import com.example.backend.services.PaymentService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PaymentController {
    PaymentService paymentService;
    MemberService memberService;
    TrainingPackageRepository packageRepository;

    @PostMapping("/prepare")
    public ResponseEntity<?> preparePayment(@RequestBody Map<String, Long> request, HttpServletRequest httpRequest, HttpServletResponse response) {
            Long packageId = request.get("packageId");
            if (packageId == null) return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Package ID is required"));

            Map<String, Object> result = paymentService.preparePaymentWithDetails(packageId, httpRequest, response);
            return ResponseEntity.ok(result);
    }

    @GetMapping("/vn-pay")
    public ResponseEntity<PaymentDTO> pay(HttpServletRequest request) {
        return ResponseEntity.ok(paymentService.createVnPayPayment(request));
    }

    @GetMapping("/vn-pay-callback")
    public ResponseEntity<PaymentDTO> payCallbackHandler(HttpServletRequest request) {
            // VNPay callback param:
            Map<String, String> vnpParams = new HashMap<>();
            request.getParameterMap().forEach((key, value) -> {
                vnpParams.put(key, value[0]);
            });

            //log.info("Received VNPay callback params: {}", vnpParams);

            PaymentDTO result = paymentService.processPaymentCallback(vnpParams);

            if ("00".equals(result.getCode())) return ResponseEntity.ok(result);
            else return ResponseEntity.badRequest().body(result);
    }
}
