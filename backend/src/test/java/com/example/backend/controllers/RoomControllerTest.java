package com.example.backend.controllers;

import com.example.backend.dtos.RoomDTO;
import com.example.backend.services.RoomService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private RoomService roomService;

    @Autowired
    private ObjectMapper objectMapper;

    private RoomDTO testRoomDTO;
    private List<RoomDTO> roomDTOList;

    @BeforeEach
    void setUp() {
        // Setup authentication
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
        Authentication authentication = new UsernamePasswordAuthenticationToken("testAdmin", null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Create test RoomDTO
        testRoomDTO = new RoomDTO();
        testRoomDTO.setRoomId(1L);
        testRoomDTO.setRoomName("Yoga Studio");
        testRoomDTO.setType("YOGA");
        testRoomDTO.setStatus("Available");

        // Create list of RoomDTOs for pagination testing
        roomDTOList = new ArrayList<>();
        roomDTOList.add(testRoomDTO);

        RoomDTO room2 = new RoomDTO();
        room2.setRoomId(2L);
        room2.setRoomName("Pilates Studio");
        room2.setType("Pilates");
        room2.setStatus("Available");
        roomDTOList.add(room2);
    }

    @Test
    @DisplayName("Should return all rooms with pagination")
    void getAllRooms_ShouldReturnAllRoomsWithPagination() throws Exception {
        Page<RoomDTO> roomPage = new PageImpl<>(roomDTOList, PageRequest.of(0, 10), roomDTOList.size());
        when(roomService.getRooms()).thenReturn((List<RoomDTO>) roomPage);

        mockMvc.perform(get("/rooms")
                        .param("page", "1")
                        .param("limit", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Yoga Studio"));

        verify(roomService, times(1)).getRooms();
    }

    @Test
    @DisplayName("Should return room by ID")
    void getRoomById_ShouldReturnRoomById() throws Exception {
        when(roomService.getRoomById(1L)).thenReturn(testRoomDTO);

        mockMvc.perform(get("/rooms/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Yoga Studio"))
                .andExpect(jsonPath("$.capacity").value(20));

        verify(roomService, times(1)).getRoomById(1L);
    }

    @Test
    @DisplayName("Should create new room")
    void createRoom_ShouldCreateNewRoom() throws Exception {
        when(roomService.createRoom(any(RoomDTO.class))).thenReturn(testRoomDTO);

        mockMvc.perform(post("/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testRoomDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Yoga Studio"));

        verify(roomService, times(1)).createRoom(any(RoomDTO.class));
    }

    @Test
    @DisplayName("Should update room successfully")
    void updateRoom_ShouldUpdateRoom() throws Exception {
        long roomId = 1L;
        RoomDTO updateDTO = createRoomDTOForUpdate(roomId);
        when(roomService.updateRoom(updateDTO, roomId)).thenReturn(updateDTO);

        mockMvc.perform(put("/rooms/" + roomId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(roomId))
                .andExpect(jsonPath("$.room_name").value("Updated Yoga Studio"))
                .andExpect(jsonPath("$.type").value("YOGA"))
                .andExpect(jsonPath("$.status").value("Maintenance"));

        verify(roomService, times(1)).updateRoom(updateDTO, roomId);
    }

    private RoomDTO createRoomDTOForUpdate(long roomId) {
        RoomDTO updateDTO = new RoomDTO();
        updateDTO.setRoomId(roomId);
        updateDTO.setRoomName("Updated Yoga Studio");
        updateDTO.setType("YOGA");
        updateDTO.setStatus("Maintenance");
        return updateDTO;
    }

    @Test
    @DisplayName("Should delete room")
    void deleteRoom_ShouldDeleteRoom() throws Exception {
        when(roomService.deleteRoom(1L)).thenReturn(String.valueOf(testRoomDTO));

        mockMvc.perform(delete("/rooms/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Yoga Studio"));

        verify(roomService, times(1)).deleteRoom(1L);
    }
}