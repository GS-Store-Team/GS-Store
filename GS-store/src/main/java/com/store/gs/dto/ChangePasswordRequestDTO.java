package com.store.gs.dto;

import lombok.Data;
import javax.validation.constraints.Size;

@Data
public class ChangePasswordRequestDTO {
    @Size(min = 8, max = 64, message = "Password length should be more or equal 8 characters!")
    private String oldPassword;
    @Size(min = 8, max = 64, message = "Password length should be more or equal 8 characters!")
    private String newPassword;
}
