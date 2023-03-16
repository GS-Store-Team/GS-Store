package com.store.gs.models.supportclasses;

import lombok.Data;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

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

    //Additional data for license server
    @Size(min = 4, max = 64, message = "Name length should be in range [4 - 64] characters!")
    @Column("first_name")
    private String firstName;
    @Size(min = 4, max = 64, message = "Last name length should be in range [4 - 64] characters!")
    @Column("last_name")
    private String lastName;
    @Size(min = 4, max = 64, message = "Third name length should be in range [4 - 64] characters!")
    @Column("third_name")
    private String thirdName;
    @Size(min = 4, max = 64, message = "Company name length should be in range [4 - 64] characters!")
    @Column("company")
    private String company;
    @Size(min = 4, max = 64, message = "Job name length should be in range [4 - 64] characters!")
    @Column("position")
    private String position;
    public static UserData defaultUser(String nickName){
        UserData userData = new UserData();
        userData.nickName = nickName;
        userData.email = null;
        userData.phoneNumber = null;
        userData.description = "New GS-store user!";
        userData.image = null;

        userData.firstName = null;
        userData.lastName = null;
        userData.thirdName = null;
        userData.company = null;
        userData.position = null;

        return userData;
    }
}
