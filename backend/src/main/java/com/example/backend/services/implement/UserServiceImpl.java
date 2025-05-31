package com.example.backend.services.implement;

import com.example.backend.dtos.CreateRequestDTO.CreateMemberRequestDTO;
import com.example.backend.dtos.CreateRequestDTO.CreateStaffRequestDTO;
import com.example.backend.dtos.CreateRequestDTO.CreateTrainerRequestDTO;
import com.example.backend.dtos.TrainerDTO;
import com.example.backend.dtos.UserDTO;
import com.example.backend.models.Member;
import com.example.backend.models.Staff;
import com.example.backend.models.Trainer;
import com.example.backend.models.User;
import com.example.backend.models.enums.UserRole;
import com.example.backend.repositories.MemberRepository;
import com.example.backend.repositories.StaffRepository;
import com.example.backend.repositories.TrainerRepository;
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
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    TrainerRepository trainerRepository;
    MemberRepository memberRepository;
    StaffRepository staffRepository;

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
        user.setRoles(user.getRoles());

        return UserDTO.fromEntity(user);
    }

    @Override
    @Transactional
    public UserDTO addUser(CreateMemberRequestDTO request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Kiểm tra phone number tồn tại
        if (memberRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone number already exists");
        }

        // Tạo user mới
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(UserRole.MEMBER); // Mặc định là MEMBER khi đăng ký

        User savedUser = userRepository.save(user);

        // Tạo member mới
        Member member = new Member();
        member.setName(request.getName());
        member.setPhoneNumber(request.getPhoneNumber());
        member.setBirthday(request.getBirthday());
        member.setAddress(request.getAddress());
        member.setUser(savedUser);
        member.setWorkoutHistories(new ArrayList<>());

        memberRepository.save(member);

        return UserDTO.fromEntity(savedUser);
    }


    @Override
    @PreAuthorize("hasRole('ADMIN')" + " or hasRole('STAFF')")
    public TrainerDTO addTrainer(CreateTrainerRequestDTO request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Tạo user mới
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(UserRole.TRAINER);

        // Tạo trainer mới
        Trainer trainer = new Trainer();
        trainer.setName(request.getName());
        trainer.setSpecialty(request.getSpecialty());
        trainer.setPhoneNumber(request.getPhoneNumber());
        trainer.setUser(user);

        // Lưu trainer (cascade sẽ lưu cả user)
        Trainer savedTrainer = trainerRepository.save(trainer);

        return TrainerDTO.fromEntity(savedTrainer);
    }


    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public UserDTO addStaff(CreateStaffRequestDTO request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Tạo user mới
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(UserRole.STAFF);

        User savedUser = userRepository.save(user);

        // Tạo staff mới
        Staff staff = new Staff();
        staff.setName(request.getName());
        staff.setUser(savedUser);

        staffRepository.save(staff);

        return UserDTO.fromEntity(savedUser);
    }


    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (userDTO.getUsername() != null && !userDTO.getUsername().equals(user.getUsername())) throw new RuntimeException("Username cannot be changed");
        if (userDTO.getPassword() != null) user.setPassword(userDTO.getPassword());

        user.setRoles(UserRole.MEMBER);

        return UserDTO.fromEntity(userRepository.save(user));
    }

    @Transactional
    @Override
    public UserDTO deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        userRepository.delete(user);
        return UserDTO.fromEntity(user);
    }

    @Override
    public User getCurrentUser() {
        try {
            // Lấy Authentication object từ SecurityContext
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Kiểm tra authenticate
            if (authentication == null || !authentication.isAuthenticated() ||
                    authentication instanceof AnonymousAuthenticationToken) {
                log.debug("No authenticated user found");
                return null;
            }

            String username = authentication.getName();

            // Tìm và trả về user từ database
            return userRepository.findByUsername(username)
                    .orElse(null);
        } catch (Exception e) {
            log.error("Error getting current user: {}", e.getMessage());
            return null;
        }
    }
}
