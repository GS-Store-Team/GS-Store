package com.store.gs.models;

import com.store.gs.models.supportclasses.UserdataImageRef;
import lombok.Data;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
@Table("userdata")
public class UserData {
    @Id
    @Column("user_id")
    private Long userId;

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

    @MappedCollection(idColumn = "userdata_id")
    private Set<UserdataImageRef> images = new HashSet<>();
}
