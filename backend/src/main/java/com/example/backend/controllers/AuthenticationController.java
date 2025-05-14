package com.example.backend.controllers;

import com.example.backend.dtos.AuthenticationDTO;
import com.example.backend.services.AuthenticationService;
import com.example.backend.services.implement.AuthenticationServiceImpl;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/login")
    ResponseEntity<?> authenticate(@RequestBody AuthenticationDTO authenticationDTO) {
        boolean result = authenticationService.authenticate(authenticationDTO);

        AuthenticationDTO responseDTO = new AuthenticationDTO();
        responseDTO.setUsername(authenticationDTO.getUsername());
        responseDTO.setAuthenticated(result);

        return ResponseEntity.ok(responseDTO);
    }
}
