package com.example.backend.services;

import com.example.backend.dtos.MemberDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberService {
    Page<MemberDTO> getAllMembers(Pageable pageable);

    MemberDTO getMemberById(Long id);

    MemberDTO addMember(MemberDTO memberDTO);

    MemberDTO updateMember(Long id, MemberDTO memberDTO);

    MemberDTO deleteMember(Long id);

    //Page<MemberDTO> searchMembers(String keyword, Pageable pageable);

    MemberDTO getMemberByPhoneNumber(String phoneNumber);
}
