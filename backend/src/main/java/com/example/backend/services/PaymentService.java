package com.example.backend.services;

import com.example.backend.dtos.PaymentDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface PaymentService {
    PaymentDTO createVnPayPayment(HttpServletRequest request);
}
