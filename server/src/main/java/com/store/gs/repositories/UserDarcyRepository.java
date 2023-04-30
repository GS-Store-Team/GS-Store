package com.store.gs.repositories;

import com.store.gs.models.darcy.License;
import com.store.gs.models.darcy.UserDarcy;
import com.store.gs.models.darcy.UserDarcyAuth;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserDarcyRepository extends CrudRepository<UserDarcy, Long> {
    public Optional<UserDarcy> findByUsername(String username);

    public Optional<UserDarcy> findByUserDarcyAuth(UserDarcyAuth auth);

    public Set<UserDarcy> findAllByLicensesIsContaining(License license);
}
