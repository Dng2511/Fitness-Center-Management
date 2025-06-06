package com.example.backend.config;

import com.example.backend.models.Room;
import com.example.backend.models.User;
import com.example.backend.models.enums.UserRole;
import com.example.backend.repositories.RoomRepository;
import com.example.backend.repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoomRepository roomRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                UserRole role = UserRole.ADMIN;

                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .roles(role)
                        .build();

                userRepository.save(user);
                log.info("Admin user created with username: admin, password: admin");
            }

            if(roomRepository.findRoomByRoomName("Phòng kho").isEmpty()){
                Room room = new Room();
                room.setRoomName("Phòng kho");
                roomRepository.save(room);
                log.info("Create Room");
            }
        };
    }
}
