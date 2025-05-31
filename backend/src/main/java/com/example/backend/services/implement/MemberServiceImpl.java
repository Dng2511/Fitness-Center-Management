package com.example.backend.services.implement;

import com.example.backend.dtos.MemberDTO;
import com.example.backend.models.Member;
import com.example.backend.models.TrainingPackage;
import com.example.backend.models.User;
import com.example.backend.repositories.MemberRepository;
import com.example.backend.repositories.TrainingPackageRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.MemberService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MemberServiceImpl implements MemberService {

    TrainingPackageRepository trainingPackageRepository;
    MemberRepository memberRepository;
    UserRepository userRepository;

    @Override
    public Page<MemberDTO> getAllMembers(Pageable pageable) {
        return memberRepository.findAll(pageable).map(MemberDTO::fromEntity);
    }

    @Override
    public MemberDTO getMemberById(Long id) {
        return MemberDTO.fromEntity(Objects.requireNonNull(memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found with id: " + id))));
    }

    @Override
    public MemberDTO addMember(MemberDTO memberDTO) {
        Member member = new Member();

        member.setName(memberDTO.getName());
        if (memberRepository.existsByPhoneNumber(memberDTO.getPhoneNumber())) {
            throw new RuntimeException("Member with phone number " + memberDTO.getPhoneNumber() + " already exists");
        }
        member.setPhoneNumber(memberDTO.getPhoneNumber());
        member.setAddress(memberDTO.getAddress());
        member.setAddress(memberDTO.getAddress());
        if (memberDTO.getTrainingPackageId() != null) {
            TrainingPackage trainingPackage = trainingPackageRepository.findById(memberDTO.getTrainingPackageId())
                    .orElseThrow();
            member.setTrainingPackage(trainingPackage);
        }

        if (memberDTO.getUserId() != null) {
            User user = userRepository.findById(memberDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + memberDTO.getUserId()));
            member.setUser(user);
        }


        return MemberDTO.fromEntity(memberRepository.save(member));
    }

    @Override
    public MemberDTO updateMember(Long id, MemberDTO memberDTO) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found with id: " + id));

        if (memberDTO.getName() != null) member.setName(memberDTO.getName());
        if (memberDTO.getAddress() != null) member.setAddress(memberDTO.getAddress());
        if (memberDTO.getTrainingPackageId() != null) {
            TrainingPackage trainingPackage = trainingPackageRepository.findById(memberDTO.getTrainingPackageId())
                    .orElseThrow(() -> new RuntimeException("Training package not found with id: " + memberDTO.getTrainingPackageId()));
            member.setTrainingPackage(trainingPackage);
        }

        return MemberDTO.fromEntity(memberRepository.save(member));
    }

    @Override
    @Transactional
    public MemberDTO deleteMember(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found with id: " + id));

        if (member.getTrainingPackage() != null) {
            TrainingPackage trainingPackage = member.getTrainingPackage();
            trainingPackage.getMembers().remove(member);
            member.setTrainingPackage(null);
            trainingPackageRepository.save(trainingPackage);
        }

        memberRepository.delete(member);
        return MemberDTO.fromEntity(member);
    }

    @Override
    public MemberDTO getMemberByPhoneNumber(String phoneNumber) {
        return MemberDTO.fromEntity(Objects.requireNonNull(memberRepository.findByPhoneNumber(phoneNumber)));
    }

    @Override
    public Member getCurrentLoggedInMember() throws RuntimeException {
        try {
            // Lấy thông tin Authentication hiện tại từ SecurityContextHolder
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Kiểm tra xem người dùng đã được xác thực chưa
            if (authentication == null || !authentication.isAuthenticated() ||
                    authentication instanceof AnonymousAuthenticationToken) {
                throw new RuntimeException("User not authenticated");
            }

            // Lấy username từ principal
            String username = authentication.getName();

            // Tìm User trong database
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

            // Lấy thông tin Member từ User
            Member member = user.getMemberInfo();

            if (member == null) {
                throw new RuntimeException("Member information not found for user: " + username);
            }

            return member;
        } catch (Exception e) {
            log.error("Error getting current logged in member: {}", e.getMessage());
            throw new RuntimeException("Unable to get current user: " + e.getMessage());
        }
    }
}
