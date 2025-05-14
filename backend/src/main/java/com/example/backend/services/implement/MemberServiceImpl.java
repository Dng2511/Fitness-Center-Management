package com.example.backend.services.implement;

import com.example.backend.dtos.MemberDTO;
import com.example.backend.models.Member;
import com.example.backend.models.TrainingPackage;
import com.example.backend.models.User;
import com.example.backend.repositories.MemberRepository;
import com.example.backend.repositories.TrainingPackageRepository;
import com.example.backend.services.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final TrainingPackageRepository trainingPackageRepository;
    private final MemberRepository memberRepository;
    //private final UserRepository userRepository;

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

//        if (memberDTO.getUserId() != null) {
//            User user = userRepository.findById(memberDTO.getUserId())
//                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + memberDTO.getUserId()));
//            member.setUser(user);
//        }


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
}
