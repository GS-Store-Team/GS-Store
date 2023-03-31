package com.store.gs.models.supportclasses;

import lombok.Data;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Table("userdata")
public class UserData {
    @Size(min = 4, max = 64, message = "Name length should be in range [4 - 64] characters!")
    @Column("nickname")
    @NotBlank
    private String nickName;
    @Size(max = 256, message = "Email incorrect!")
    private String email;
    @Size(max = 20, message = "Phone length should be less than symbols!")
    @Column("phonenumber")
    private String phoneNumber;
    @Size(max = 2048, message = "Description length should be less than 2048 symbols!")
    private String description;
    private Long image;

    @Transient
    private long id;
    @Transient
    private boolean active;

    @Transient
    private Avatar avatar;

    public static UserData defaultUser(String nickName){
        UserData userData = new UserData();
        userData.nickName = nickName;
        userData.email = null;
        userData.phoneNumber = null;
        userData.description = "New GS-store user!";
        userData.image = null;

        return userData;
    }
}
