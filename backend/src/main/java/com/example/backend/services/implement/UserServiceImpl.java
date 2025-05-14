package com.example.backend.services.implement;

import com.example.backend.dtos.MemberDTO;
import com.example.backend.dtos.UserDTO;
import com.example.backend.models.Member;
import com.example.backend.models.User;
import com.example.backend.models.enums.UserRole;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;

    @Override
    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(UserDTO::fromEntity);
    }

    @Override
    public UserDTO getUserById(Long id) {
        return UserDTO.fromEntity(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id)));
    }

    @Override
    public UserDTO addUser(UserDTO userDTO) {
        User user = new User();

        if (userRepository.existsByUsername(userDTO.getUsername())) throw new RuntimeException("Username already exists");

        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setRole(UserRole.MEMBER);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return UserDTO.fromEntity(userRepository.save(user));
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (userDTO.getUsername() != null && !userDTO.getUsername().equals(user.getUsername())) throw new RuntimeException("Username cannot be changed");
        if (userDTO.getPassword() != null) user.setPassword(userDTO.getPassword());
        user.setRole(UserRole.MEMBER);

        return UserDTO.fromEntity(userRepository.save(user));
    }

    @Transactional
    @Override
    public UserDTO deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        userRepository.delete(user);
        return UserDTO.fromEntity(user);
    }
}
