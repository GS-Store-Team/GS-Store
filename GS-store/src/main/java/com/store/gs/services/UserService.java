package com.store.gs.services;

import com.store.gs.models.User;
import com.store.gs.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmail(String email){
        return userRepository.getUserByEmail(email).orElse(null);
    }
}