package com.store.gs.models;

import com.store.gs.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("usr")
public class User {
    @Id
    private long id;
    @NotBlank(message = "Email can not be blank!")
    @Email(message = "Email incorrect!")
    private String email;
    @Size(min = 8, max = 64, message = "Password length should be more or equal 8 characters!")
    private String password;
    private boolean active;
    private Role role;
}
