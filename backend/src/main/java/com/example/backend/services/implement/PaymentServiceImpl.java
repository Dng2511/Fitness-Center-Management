package com.example.backend.services.implement;

import com.example.backend.config.VNPayConfig;
import com.example.backend.dtos.PaymentDTO;
import com.example.backend.services.PaymentService;
import com.example.backend.utils.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    VNPayConfig vnPayConfig;

    @Override
    public PaymentDTO createVnPayPayment(HttpServletRequest request) {
//        request.getParameterMap().forEach((key, value) -> {
//            log.info("Request Param - {} = {}", key, Arrays.toString(value));
//        });

        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        //log.info("Raw amount = {}", amount);
        //String bankCode = request.getParameter("bankCode");
        //log.info("BankCode param: {}", bankCode);
        Map<String, String> vnpParamsMap = new HashMap<>(vnPayConfig.getVNPayConfig());
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
//        if (bankCode != null && !bankCode.isEmpty()) {
//            vnpParamsMap.put("vnp_BankCode", bankCode);
//        }
        //vnpParamsMap.put("vnp_BankCode", "NCB");

        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);

        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

//        log.info("queryUrl = {}", queryUrl);
//        log.info("hashData = {}", hashData);
//        log.info("secureHash = {}", vnpSecureHash);
//        log.info("paymentUrl = {}", paymentUrl);
        return PaymentDTO.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl)
                .build();
    }
}
