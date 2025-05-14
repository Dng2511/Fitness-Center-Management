package com.example.backend.services.implement;

import com.example.backend.dtos.AuthenticationDTO;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationServiceImpl implements AuthenticationService {
    UserRepository userRepository;

    public boolean authenticate(AuthenticationDTO authenticationDTO) {
        var user = userRepository.findByUsername(authenticationDTO.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        return passwordEncoder.matches(authenticationDTO.getPassword(), user.getPassword());
    }
}
