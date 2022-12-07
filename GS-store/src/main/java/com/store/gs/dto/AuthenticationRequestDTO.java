package com.store.gs.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
public class AuthenticationRequestDTO {
    private String username;
    private String password;
}