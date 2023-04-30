package com.store.gs.models.darcy;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.Email;

@Data
@Table("darcy_auth")
public class UserDarcyAuth {
    @Id
    private final long id;
    private final long userId;
    private String username;
    private String password;
    @Email
    private String email;
    private String accessToken;
    private String refreshToken;
}
