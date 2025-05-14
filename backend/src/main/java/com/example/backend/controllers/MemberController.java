package com.example.backend.controllers;

import com.example.backend.dtos.MemberDTO;
import com.example.backend.services.MemberService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MemberController {
    MemberService memberService;

    @GetMapping
    public ResponseEntity<?> getAllMembers(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        PageRequest pageable = PageRequest.of(page - 1, limit);

        return ResponseEntity.ok(memberService.getAllMembers(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMemberById(@PathVariable("id") Long id) {
            MemberDTO memberDTO = memberService.getMemberById(id);
            return ResponseEntity.ok(memberDTO);
    }

    @PostMapping
    public ResponseEntity<?> addMember(@RequestBody MemberDTO memberDTO) {
            MemberDTO createdMember = memberService.addMember(memberDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMember);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(
            @PathVariable("id") Long id,
            @RequestBody MemberDTO memberDTO
    ) {
            MemberDTO updatedMember = memberService.updateMember(id, memberDTO);
            return ResponseEntity.ok(updatedMember);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable("id") Long id) {
            MemberDTO deletedMember = memberService.deleteMember(id);
            return ResponseEntity.ok(deletedMember);
    }

    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<?> getMemberByPhoneNumber(@PathVariable("phoneNumber") String phoneNumber) {
            MemberDTO memberDTO = memberService.getMemberByPhoneNumber(phoneNumber);
            return ResponseEntity.ok(memberDTO);
    }
}
