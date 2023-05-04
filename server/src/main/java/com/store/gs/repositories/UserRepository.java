package com.store.gs.repositories;

import com.store.gs.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> getUserByEmail(String email);

    boolean existsUserByEmail(String email);

    Optional<User> getUserById(Long id);
}
