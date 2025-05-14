package com.example.backend.services;

import com.example.backend.dtos.AuthenticationDTO;

public interface AuthenticationService {
    boolean authenticate(AuthenticationDTO authenticationDTO);
}
