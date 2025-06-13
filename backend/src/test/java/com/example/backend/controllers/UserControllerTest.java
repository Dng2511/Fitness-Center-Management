package com.example.backend.controllers;

import com.example.backend.dtos.CreateRequestDTO.CreateMemberRequestDTO;
import com.example.backend.dtos.CreateRequestDTO.CreateStaffRequestDTO;
import com.example.backend.dtos.CreateRequestDTO.CreateTrainerRequestDTO;
import com.example.backend.dtos.TrainerDTO;
import com.example.backend.dtos.UserDTO;
import com.example.backend.models.enums.UserRole;
import com.example.backend.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDTO testUserDTO;
    private TrainerDTO testTrainerDTO;
    private List<UserDTO> userDTOList;

    @BeforeEach
    void setUp() {
        // Setup mock authentication
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getName()).thenReturn("testUser");

        // Fix for the thenReturn issue with authorities
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
        doReturn(authorities).when(authentication).getAuthorities();

        // Create test UserDTO
        testUserDTO = new UserDTO(
                1L,
                "admin",
                "admin",
                UserRole.ADMIN,
                null,
                null,
                null
        );

        // Create test TrainerDTO
        testTrainerDTO = new TrainerDTO();
        testTrainerDTO.setId(1L);
        testTrainerDTO.setSpecialty("Weight Training");

        // Create list of UserDTOs for pagination testing
        userDTOList = new ArrayList<>();
        userDTOList.add(testUserDTO);
        userDTOList.add(new UserDTO(2L, "user2", "pass2", UserRole.MEMBER, null, null, null));
        userDTOList.add(new UserDTO(3L, "user3", "pass3", UserRole.STAFF, null, null, null));
    }

    @Test
    @DisplayName("Should return all users with pagination")
    void getAllUsers_ShouldReturnAllUsersWithPagination() throws Exception {
        // Arrange
        Page<UserDTO> userDTOPage = new PageImpl<>(userDTOList, PageRequest.of(0, 10), userDTOList.size());
        when(userService.getAllUsers(any(PageRequest.class))).thenReturn(userDTOPage);

        // Act & Assert
        mockMvc.perform(get("/users")
                        .param("page", "1")
                        .param("limit", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(3)))
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].username").value("testUser"))
                .andExpect(jsonPath("$.content[0].roles").value("ADMIN"));

        verify(userService, times(1)).getAllUsers(any(PageRequest.class));
    }

    @Test
    @DisplayName("Should return user by ID")
    void getUserById_ShouldReturnUserById() throws Exception {
        // Arrange
        when(userService.getUserById(1L)).thenReturn(testUserDTO);

        // Act & Assert
        mockMvc.perform(get("/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("admin"))
                .andExpect(jsonPath("$.roles").value("ADMIN"));

        verify(userService, times(1)).getUserById(1L);
    }

    @Test
    @DisplayName("Should return current user info")
    void getMyInfo_ShouldReturnCurrentUserInfo() throws Exception {
        // Arrange
        when(userService.getMyInfo()).thenReturn(testUserDTO);

        // Act & Assert
        mockMvc.perform(get("/users/my-info"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testUser"))
                .andExpect(jsonPath("$.roles").value("ADMIN"));

        verify(userService, times(1)).getMyInfo();
    }

    @Test
    @DisplayName("Should register new member")
    void addUser_ShouldRegisterNewMember() throws Exception {
        // Arrange
        CreateMemberRequestDTO request = new CreateMemberRequestDTO();
        request.setUsername("newMember");
        request.setPassword("password123");

        when(userService.addUser(any(CreateMemberRequestDTO.class))).thenReturn(testUserDTO);

        // Act & Assert
        mockMvc.perform(post("/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testUser"));

        verify(userService, times(1)).addUser(any(CreateMemberRequestDTO.class));
    }

    @Test
    @DisplayName("Should add new trainer")
    void addTrainer_ShouldAddNewTrainer() throws Exception {
        // Arrange
        CreateTrainerRequestDTO request = new CreateTrainerRequestDTO();
        request.setUsername("newTrainer");
        request.setPassword("password123");
        request.setSpecialty("Yoga");

        when(userService.addTrainer(any(CreateTrainerRequestDTO.class))).thenReturn(testTrainerDTO);

        // Act & Assert
        mockMvc.perform(post("/users/add-trainer")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.specialization").value("Weight Training"));

        verify(userService, times(1)).addTrainer(any(CreateTrainerRequestDTO.class));
    }

    @Test
    @DisplayName("Should add new staff")
    void addStaff_ShouldAddNewStaff() throws Exception {
        // Arrange
        CreateStaffRequestDTO request = new CreateStaffRequestDTO();
        request.setUsername("newStaff");
        request.setPassword("password123");
        request.setName("Front Desk");

        when(userService.addStaff(any(CreateStaffRequestDTO.class))).thenReturn(testUserDTO);

        // Act & Assert
        mockMvc.perform(post("/users/add-staff")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testUser"));

        verify(userService, times(1)).addStaff(any(CreateStaffRequestDTO.class));
    }

    @Test
    @DisplayName("Should update user")
    void updateUser_ShouldUpdateUserDetails() throws Exception {
        // Arrange
        UserDTO updateDTO = new UserDTO(
                1L,
                "updatedUser",
                "password123",
                UserRole.ADMIN,
                null,
                null,
                null
        );

        when(userService.updateUser(eq(1L), any(UserDTO.class))).thenReturn(updateDTO);

        // Act & Assert
        mockMvc.perform(put("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("updatedUser"));

        verify(userService, times(1)).updateUser(eq(1L), any(UserDTO.class));
    }

    @Test
    @DisplayName("Should delete user")
    void deleteUser_ShouldDeleteUser() throws Exception {
        // Arrange
        when(userService.deleteUser(1L)).thenReturn(testUserDTO);

        // Act & Assert
        mockMvc.perform(delete("/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testUser"));

        verify(userService, times(1)).deleteUser(1L);
    }

    @Test
    @DisplayName("Should handle validation errors")
    void addUser_ShouldHandleValidationErrors() throws Exception {
        // Arrange
        CreateMemberRequestDTO invalidRequest = new CreateMemberRequestDTO();
        invalidRequest.setUsername("te"); // Too short username
        invalidRequest.setPassword("short"); // Too short password

        // Act & Assert
        mockMvc.perform(post("/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest()); // Expecting 400 Bad Request

        // Verifying that service was never called due to validation failure
        verify(userService, never()).addUser(any(CreateMemberRequestDTO.class));
    }
}