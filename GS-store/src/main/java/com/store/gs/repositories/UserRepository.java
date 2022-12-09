package com.store.gs.repositories;

import com.store.gs.models.User;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> getUserByEmail(String email);

    boolean existsUserByEmail(String email);

    @Modifying
    @Query("insert into usr (email, name, password, role, active)" +
            "values (:email, :name, :password, :role, :active)")
    void saveUser(@Param("email") String email,
                  @Param("name") String name,
                  @Param("password") String password,
                  @Param("role") String role,
                  @Param("active") boolean active);

}
