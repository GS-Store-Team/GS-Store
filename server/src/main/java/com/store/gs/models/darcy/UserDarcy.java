package com.store.gs.models.darcy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@Data
@Table("darcy_users")
@NoArgsConstructor
@AllArgsConstructor
public class UserDarcy {
    @Id
    private long id;

    private long userId;

    private String username;

    private String password;

    @MappedCollection(idColumn = "license_id")
    private Set<License> licenses;

    private boolean isLogged = false;

    @MappedCollection(idColumn = "auth_id")
    private UserDarcyAuth userDarcyAuth;
}
