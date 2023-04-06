package com.store.gs.dto;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import java.util.Date;
import java.util.List;

@Data
public class DarcyUserDTO {
    @Id
    private long id;
    private int roleId;
    private boolean isActive;
    private String firstName;
    private String lastName;

    private String thirdName;
    @Email
    private String email;

    private String username;
    private String telephone;

    private boolean isLegalPerson;

    private String company;

    private String region;

    private String position;

    private String gender;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date dob;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date createdAt;

    private String photo;

    private List<ShortProductDTO> products;
}
