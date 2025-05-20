package com.example.backend.controllers;

import com.example.backend.dtos.AuthenticationDTO;
import com.example.backend.dtos.IntrospectDTO;
import com.example.backend.services.AuthenticationService;
import com.example.backend.services.implement.AuthenticationServiceImpl;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Builder
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/login")
    ResponseEntity<?> authenticate(@RequestBody AuthenticationDTO authenticationDTO) {
        var result = authenticationService.authenticate(authenticationDTO);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/introspect")
    ResponseEntity<?> introspect(@RequestBody IntrospectDTO introspectDTO) throws ParseException, JOSEException {
        var result = authenticationService.introspect(introspectDTO);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/logout")
    ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) throws JOSEException, ParseException {
        String token = authHeader.substring(7);
        authenticationService.logout(token);
        return ResponseEntity.ok("Logout successful");
    }
}
