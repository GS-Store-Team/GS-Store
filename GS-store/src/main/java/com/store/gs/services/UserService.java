package com.store.gs.services;

import com.store.gs.enums.Role;
import com.store.gs.models.Plugin;
import com.store.gs.models.User;
import com.store.gs.repositories.PluginRepository;
import com.store.gs.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PluginRepository pluginRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean register(User user){
        if(userRepository.getUserByEmail(user.getEmail()).isPresent())
            return false;
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.saveUser(
                user.getEmail(),
                user.getName(),
                user.getPassword(),
                Role.USER.toString(),
                true);

        return true;
    }

    public Page<Plugin> getUserPluginsByUserEmail(String email, int pageId){
        return pluginRepository.getByDeveloperEmail(email, PageRequest.of(pageId, 10));
    }
}
