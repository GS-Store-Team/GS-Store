package com.store.gs.repositories;

import com.store.gs.models.User;
import com.store.gs.models.darcy.UserAuthData;
import org.springframework.data.repository.CrudRepository;

public interface DarcyUserAuthDataRepository extends CrudRepository<UserAuthData, Long> {
    UserAuthData getUserAuthDataByUserId(long userId);
    UserAuthData getUserAuthDataByUsername(String username);
}
