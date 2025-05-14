package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationDTO {
    String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    
    boolean authenticated;
}
