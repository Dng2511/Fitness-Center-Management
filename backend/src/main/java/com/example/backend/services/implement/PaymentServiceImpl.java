package com.example.backend.services.implement;

import com.example.backend.config.VNPayConfig;
import com.example.backend.dtos.PaymentDTO;
import com.example.backend.models.Member;
import com.example.backend.models.Payment;
import com.example.backend.models.TrainingPackage;
import com.example.backend.repositories.MemberRepository;
import com.example.backend.repositories.PaymentRepository;
import com.example.backend.repositories.TrainingPackageRepository;
import com.example.backend.services.MemberService;
import com.example.backend.services.PaymentService;
import com.example.backend.utils.VNPayUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    VNPayConfig vnPayConfig;
    PaymentRepository paymentRepository;
    MemberRepository memberRepository;
    TrainingPackageRepository packageRepository;
    MemberService memberService;
    RedisTemplate<String, String> redisTemplate;

    static String PAYMENT_PREFIX = "payment:";
    static long PAYMENT_EXPIRATION = 30; // min

    @Override
    public String preparePayment(Long memberId, Long packageId) {
        String paymentKey = UUID.randomUUID().toString();

        String redisKey = PAYMENT_PREFIX + paymentKey;

        redisTemplate.opsForHash().put(redisKey, "memberId", memberId.toString());
        redisTemplate.opsForHash().put(redisKey, "packageId", packageId.toString());
        redisTemplate.opsForHash().put(redisKey, "createdAt", LocalDateTime.now().toString());

        // ttl
        redisTemplate.expire(redisKey, PAYMENT_EXPIRATION, TimeUnit.MINUTES);

        return paymentKey;
    }

    @Override
    public Map<String, Object> preparePaymentWithDetails(Long packageId, HttpServletRequest request, HttpServletResponse response) {
        // Lấy thông tin member đang đăng nhập
        Member currentMember = memberService.getCurrentLoggedInMember();
        if (currentMember == null) throw new RuntimeException("User not authenticated");

        // Xóa full key cũ của member này trước khi tạo key mới
        try {
            String memberKeyPattern = PAYMENT_PREFIX + "*";
            Set<String> allKeys = redisTemplate.keys(memberKeyPattern);
            int deletedCount = 0;

            if (!allKeys.isEmpty()) {
                for (String key : allKeys) {
                    Object storedMemberId = redisTemplate.opsForHash().get(key, "memberId");
                    if (storedMemberId != null && currentMember.getId().toString().equals(storedMemberId.toString())) {
                        redisTemplate.delete(key);
                        deletedCount++;
                    }
                }
                log.info("Deleted {} old payment keys for member {}", deletedCount, currentMember.getId());
            }
        } catch (Exception e) {
            log.warn("Error while cleaning up old payment keys: {}", e.getMessage());
            // Không throw exception, tiếp tục xử lý
        }

        // Lấy thông tin package
        TrainingPackage trainingPackage = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found with ID: " + packageId));

        // Lưu thông tin vào Redis -> paymentKey
        String paymentKey = preparePayment(currentMember.getId(), packageId);

        // Lưu paymentKey vào session
        request.getSession().setAttribute("paymentKey", paymentKey);

        // Lưu paymentKey vào cookie
        Cookie cookie = new Cookie("paymentKey", paymentKey);
        cookie.setPath("/");
        cookie.setMaxAge(1800); // 30 min
        response.addCookie(cookie);

        // res
        Map<String, Object> result = new HashMap<>();
        result.put("paymentKey", paymentKey);
        result.put("packageName", trainingPackage.getPackageName());
        result.put("packagePrice", trainingPackage.getPrice());
        result.put("readyForPayment", true);

        return result;
    }

    @Override
    public PaymentDTO createVnPayPayment(HttpServletRequest request) {
//        request.getParameterMap().forEach((key, value) -> {
//            log.info("Request Param - {} = {}", key, Arrays.toString(value));
//        });

        //long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        //log.info("Raw amount = {}", amount);
        //String bankCode = request.getParameter("bankCode");
        //log.info("BankCode param: {}", bankCode);

        // Lấy paymentKey từ session hoặc cookie
        HttpSession session = request.getSession();
        String paymentKey = (String) session.getAttribute("paymentKey");

        if (paymentKey == null) {
            // ko có trong session -> thử lấy từ cookie
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("paymentKey".equals(cookie.getName())) {
                        paymentKey = cookie.getValue();
                        break;
                    }
                }
            }
        }

        if (paymentKey == null) // Giao dịch chưa được khởi tạo
            return PaymentDTO.builder()
                    .code("99")
                    .message("No payment in progress. Please select a package first.")
                    .build();

        // Lấy thông tin từ Redis với prefix
        String redisKey = PAYMENT_PREFIX + paymentKey;
        Object memberIdObj = redisTemplate.opsForHash().get(redisKey, "memberId");
        Object packageIdObj = redisTemplate.opsForHash().get(redisKey, "packageId");

        if (memberIdObj == null || packageIdObj == null) {
            return PaymentDTO.builder()
                    .code("99")
                    .message("Payment information expired. Please try again.")
                    .build();
        }

        Long memberId = Long.parseLong(memberIdObj.toString());
        Long packageId = Long.parseLong(packageIdObj.toString());
        String txnRef = memberId + "_" + packageId + "_" + VNPayUtil.getRandomNumber(8);

        redisTemplate.opsForHash().put(redisKey, "txnRef", txnRef); // Lưu txnRef vào Redis để sử dụng sau này

        Integer amount = (int) (packageRepository.findById(packageId)
                        .orElseThrow(() -> new RuntimeException("Package not found with ID: " + packageId))
                        .getPrice() * 100L);

        Map<String, String> vnpParamsMap = new HashMap<>(vnPayConfig.getVNPayConfig());
        vnpParamsMap.put("vnp_TxnRef", txnRef);
        vnpParamsMap.put("vnp_OrderInfo", "Thanh toan don hang:" + txnRef);
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
//        if (bankCode != null && !bankCode.isEmpty()) {
//            vnpParamsMap.put("vnp_BankCode", bankCode);
//        }
        //vnpParamsMap.put("vnp_BankCode", "NCB");

        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));

        // build query url
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

    private String getErrorMessage(String responseCode) {
        Map<String, String> errorMessages = new HashMap<>();
        errorMessages.put("00", "Giao dịch thành công");
        errorMessages.put("07", "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).");
        errorMessages.put("09", "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.");
        errorMessages.put("10", "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần");
        errorMessages.put("11", "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.");
        errorMessages.put("12", "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.");
        errorMessages.put("13", "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.");
        errorMessages.put("24", "Giao dịch không thành công do: Khách hàng hủy giao dịch");
        errorMessages.put("51", "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.");
        errorMessages.put("65", "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.");
        errorMessages.put("75", "Ngân hàng thanh toán đang bảo trì.");
        errorMessages.put("79", "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch");
        errorMessages.put("99", "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)");

        return errorMessages.getOrDefault(responseCode, "Lỗi không xác định (Mã lỗi: " + responseCode + ")");
    }

    @Override
    public PaymentDTO processPaymentCallback(Map<String, String> vnpParams) {
        try {
            // 1. Lấy các tham số quan trọng
            String vnp_ResponseCode = vnpParams.get("vnp_ResponseCode");
            String vnp_TxnRef = vnpParams.get("vnp_TxnRef");
            String vnp_Amount = vnpParams.get("vnp_Amount");
            String vnp_TransactionNo = vnpParams.get("vnp_TransactionNo");
            String vnp_PayDate = vnpParams.get("vnp_PayDate");

            log.info("VNPay callback: TxnRef={}, ResponseCode={}", vnp_TxnRef, vnp_ResponseCode);

            // 2. Parse txnRef để lấy memberId và packageId
            String[] txnRefParts = vnp_TxnRef.split("_");
            if (txnRefParts.length < 2) {
                return PaymentDTO.builder()
                        .code("97")
                        .message("Mã giao dịch không hợp lệ")
                        .build();
            }

            Long memberId = Long.parseLong(txnRefParts[0]);
            Long packageId = Long.parseLong(txnRefParts[1]);

            // 3. Xử lý theo mã phản hồi
            if ("00".equals(vnp_ResponseCode)) {
                // Giao dịch thành công - Cập nhật dữ liệu

                // a. Lấy thông tin member và package
                Member member = memberRepository.findById(memberId)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy thành viên với ID: " + memberId));

                TrainingPackage trainingPackage = packageRepository.findById(packageId)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy gói tập với ID: " + packageId));

                // b. Cập nhật gói tập cho thành viên
                LocalDate today = LocalDate.now();
                member.setTrainingPackage(trainingPackage);
                member.setPackageStartDate(today);
                member.setPackageEndDate(today.plusDays(trainingPackage.getDurationMonths()));
                memberRepository.save(member);

                // c. Tạo bản ghi thanh toán
                Payment payment = new Payment();
                payment.setMember(member);
                payment.setAmount(Double.parseDouble(vnp_Amount) / 100); // Chuyển về đơn vị tiền tệ gốc
                payment.setTrainingPackage(trainingPackage);
                payment.setTransactionCode(vnp_TransactionNo);
                payment.setStatus("SUCCESS");

                // Parse ngày thanh toán nếu có
                try {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
                    LocalDateTime paymentDate = LocalDateTime.parse(vnp_PayDate, formatter);
                    payment.setPaymentDate(paymentDate);
                } catch (Exception e) {
                    payment.setPaymentDate(LocalDateTime.now());
                }

                paymentRepository.save(payment);

                log.info("Thanh toán thành công cho member:{}, package:{}", memberId, packageId);

                return PaymentDTO.builder()
                        .code("00")
                        .message("Thanh toán thành công")
                        .build();

            } else {
                // Giao dịch thất bại - Lưu log và thông báo lỗi
                log.warn("Thanh toán thất bại: member={}, package={}, code={}",
                        memberId, packageId, vnp_ResponseCode);

                // Tạo bản ghi thanh toán thất bại để theo dõi
                Payment payment = new Payment();
                Member member = memberRepository.findById(memberId).orElse(null);
                payment.setMember(member);
                payment.setAmount(Double.parseDouble(vnp_Amount) / 100);
                payment.setTrainingPackage(packageRepository.findById(packageId).orElseThrow(() -> new RuntimeException("Can not find the package with id: " + packageId)));
                payment.setTransactionCode(vnp_TransactionNo);
                payment.setPaymentDate(LocalDateTime.now());
                payment.setStatus("FAILED");

                paymentRepository.save(payment);

                // Trả về thông báo lỗi
                return PaymentDTO.builder()
                        .code(vnp_ResponseCode)
                        .message(getErrorMessage(vnp_ResponseCode))
                        .build();
            }
        } catch (Exception e) {
            log.error("Lỗi xử lý thanh toán: ", e);
            return PaymentDTO.builder()
                    .code("99")
                    .message("Lỗi hệ thống: " + e.getMessage())
                    .build();
        }
    }
}
