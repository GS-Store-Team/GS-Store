package com.store.gs.services;

import com.store.gs.models.darcy.UserDarcy;
import com.store.gs.repositories.UserDarcyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDarcyService {

    private final UserDarcyRepository userDarcyRepository;

    public UserDarcy findByUsername(String username) {
        Optional<UserDarcy> userDarcy = userDarcyRepository.findByUsername(username);
        if (userDarcy.isPresent()) {
            return userDarcy.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    public void save(UserDarcy userDarcy) {
        Optional<UserDarcy> userDarcyOptional = userDarcyRepository.findByUsername(userDarcy.getUsername());
        long id;
        if (userDarcyOptional.isPresent()) {
            id = userDarcyOptional.get().getId();
            delete(id);
        }
        UserDarcy userDarcy1 = new UserDarcy(
                userDarcy.getId(),
                userDarcy.getUserId(),
                userDarcy.getUsername(),
                userDarcy.getPassword(),
                userDarcy.getLicenses(),
                userDarcy.isLogged(),
                userDarcy.getUserDarcyAuth());
        userDarcyRepository.save(userDarcy1);
    }

    public void delete(long userDarcyId) {
        userDarcyRepository.deleteById(userDarcyId);
    }
}
