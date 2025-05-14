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
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @Override
    @PreAuthorize("hasRole('ADMIN')") // kiem tra truoc khi vao method, du dieu kien moi vao dc method -> neu la admin thi moi vao dc
    public Page<UserDTO> getAllUsers(Pageable pageable) {
        //log.info("Get all users");
        return userRepository.findAll(pageable).map(UserDTO::fromEntity);
    }

    @Override
    @PostAuthorize("returnObject.username == authentication.name") // kiem tra sau khi method thuc hien xong, neu thoa dk thi tra ve
    public UserDTO getUserById(Long id) {
        //log.info("Get user by id: {}", id);
        return UserDTO.fromEntity(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id)));
    } // lay user ve, neu user match voi user dang login thi moi cho nhan thong tin

    @Override
    public UserDTO getMyInfo() { // truyen token user vao de lay thong tin user
        var context  = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name).orElseThrow(() -> new RuntimeException("User not found with username: " + name));

        user.setUsername(user.getUsername());

        HashSet<String> roles = new HashSet<>();
        roles.add(user.getRoles().iterator().next());
        user.setRoles(roles);

        return UserDTO.fromEntity(user);
    }

    @Override
    public UserDTO addUser(UserDTO userDTO) {
        User user = new User();

        if (userRepository.existsByUsername(userDTO.getUsername())) throw new RuntimeException("Username already exists");

        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());

        HashSet<String> roles = new HashSet<>();
        roles.add(UserRole.MEMBER.name());

        user.setRoles(roles);

        //PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return UserDTO.fromEntity(userRepository.save(user));
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (userDTO.getUsername() != null && !userDTO.getUsername().equals(user.getUsername())) throw new RuntimeException("Username cannot be changed");
        if (userDTO.getPassword() != null) user.setPassword(userDTO.getPassword());

        HashSet<String> roles = new HashSet<>();
        roles.add(UserRole.MEMBER.name());

        user.setRoles(roles);

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
