package com.store.gs.models;

import com.store.gs.enums.Role;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Table("usr")
public class User {
    @Id
    @Size(min = 4, max = 64, message = "\"Name\" length should be in range [4 - 64] characters!")
    private String name;
    @NotBlank(message = "\"Email\" can not be blank!")
    @Email(message = "\"Email\" incorrect!")
    private String email;
    @Size(min = 8, max = 64, message = "\"Password\" length should be more or equal 8 characters!")
    private String password;
    private boolean active;
    private Role role;
}
