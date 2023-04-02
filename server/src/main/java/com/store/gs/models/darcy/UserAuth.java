package com.store.gs.models.darcy;

import lombok.Data;

@Data
public class UserAuth {
    private final long id;
    private final String username;
    private final String email;
    private String accessToken;
    private String refreshToken;
}
