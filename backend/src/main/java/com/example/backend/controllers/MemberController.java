package com.example.backend.controllers;

import com.example.backend.dtos.MemberDTO;
import com.example.backend.services.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

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
        try {
            MemberDTO memberDTO = memberService.getMemberById(id);
            return ResponseEntity.ok(memberDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Member not found");
        }
    }

    @PostMapping
    public ResponseEntity<?> addMember(@RequestBody MemberDTO memberDTO) {
        try {
            MemberDTO createdMember = memberService.addMember(memberDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMember);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create member");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(
            @PathVariable("id") Long id,
            @RequestBody MemberDTO memberDTO
    ) {
        try {
            MemberDTO updatedMember = memberService.updateMember(id, memberDTO);
            return ResponseEntity.ok(updatedMember);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update member");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable("id") Long id) {
        try {
            MemberDTO deletedMember = memberService.deleteMember(id);
            return ResponseEntity.ok(deletedMember);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete member");
        }
    }

    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<?> getMemberByPhoneNumber(@PathVariable("phoneNumber") String phoneNumber) {
        try {
            MemberDTO memberDTO = memberService.getMemberByPhoneNumber(phoneNumber);
            return ResponseEntity.ok(memberDTO);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Cannot delete member due to existing relationships");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete member: " + e.getMessage());
        }

    }
}
