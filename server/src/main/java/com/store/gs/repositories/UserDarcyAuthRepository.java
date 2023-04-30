package com.store.gs.repositories;

import com.store.gs.models.darcy.UserDarcyAuth;
import org.springframework.data.repository.CrudRepository;

public interface UserDarcyAuthRepository extends CrudRepository<UserDarcyAuth, Long> {
    UserDarcyAuth getUserAuthDataByUserId(long userId);

    UserDarcyAuth getUserAuthDataByUsername(String username);
}
