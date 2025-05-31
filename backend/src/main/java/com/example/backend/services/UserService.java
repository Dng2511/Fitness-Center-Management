package com.example.backend.services;

import com.example.backend.dtos.CreateRequestDTO.CreateMemberRequestDTO;
import com.example.backend.dtos.CreateRequestDTO.CreateStaffRequestDTO;
import com.example.backend.dtos.CreateRequestDTO.CreateTrainerRequestDTO;
import com.example.backend.dtos.TrainerDTO;
import com.example.backend.dtos.UserDTO;
import com.example.backend.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    Page<UserDTO> getAllUsers(Pageable pageable);

    UserDTO getUserById(Long id);

    UserDTO getMyInfo();

    UserDTO addUser(CreateMemberRequestDTO request);

    TrainerDTO addTrainer(CreateTrainerRequestDTO request);

    UserDTO addStaff(CreateStaffRequestDTO request);

    UserDTO updateUser(Long id, UserDTO userDTO);

    UserDTO deleteUser(Long id);

    User getCurrentUser();
}
