package com.store.gs.services;

import com.store.gs.enums.Role;
import com.store.gs.models.User;
import com.store.gs.repositories.UserRepository;
import com.store.gs.utils.ModelsUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public User getUserByEmail(String email){
        return userRepository.getUserByEmail(email).orElse(null);
    }

    public boolean createNewUser(String username, String password){

        if(userRepository.existsUserByEmail(username)) return false;

        userRepository.saveUser(
                username,
                ModelsUtils.generateUserName(),
                encoder.encode(password),
                Role.USER.toString(),
                true
        );

        return true;
    }
}