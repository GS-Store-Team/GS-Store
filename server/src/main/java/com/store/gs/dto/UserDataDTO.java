package com.store.gs.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter @Getter
public class UserDataDTO {
    private Long userId;
    private String nickName;
    private String email;
    private String phoneNumber;
    private String description;
    private List<Long> images;
}
