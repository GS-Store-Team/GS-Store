package com.store.gs.dto;

import lombok.Data;

@Data
public class RefreshDTO {
    private long id;
    private String accessToken;
    private String refreshToken;
}
