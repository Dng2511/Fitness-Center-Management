package com.example.backend.services;

import com.example.backend.dtos.PaymentDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

public interface PaymentService {
    String preparePayment(Long memberId, Long packageId);

    Map<String, Object> preparePaymentWithDetails(Long packageId, HttpServletRequest request, HttpServletResponse response);

    PaymentDTO createVnPayPayment(HttpServletRequest request);

    PaymentDTO processPaymentCallback(Map<String, String> vnpParams);
}
