package com.example.backend.controllers;

import com.example.backend.dtos.UserDTO;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        PageRequest pageable = PageRequest.of(page - 1, limit);

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        // Kiem tra xem user vua login co role gi
        log.info("Username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority() + " "));

        Page<UserDTO> userDTOPage = userService.getAllUsers(pageable);
        return ResponseEntity.ok(userDTOPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        UserDTO userDTO = userService.getUserById(id);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/my-info")
    public ResponseEntity<?> getMyInfo() {
        UserDTO userDTO = userService.getMyInfo();
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody @Valid UserDTO userDTO) {
        UserDTO createdUser = userService.addUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable("id") Long id,
            @RequestBody @Valid UserDTO userDTO
    ) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        UserDTO deletedUser = userService.deleteUser(id);
        return ResponseEntity.ok(deletedUser);
    }
}
