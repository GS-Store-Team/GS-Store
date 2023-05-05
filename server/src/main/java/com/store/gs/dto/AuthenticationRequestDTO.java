package com.store.gs.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class AuthenticationRequestDTO {
    @NotBlank(message = "Email can not be blank!")
    @Email(message = "Email incorrect!")
    private String username;
    @Size(min = 8, max = 64, message = "Password length can not be less than 8 characters!")
    private String password;
}