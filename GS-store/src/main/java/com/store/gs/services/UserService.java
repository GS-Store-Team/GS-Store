//package com.store.gs.services;
//
//import com.store.gs.enums.Role;
//import com.store.gs.models.User;
//import com.store.gs.repositories.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@RequiredArgsConstructor
////@Service
//public class UserService {
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public boolean register(User user){
//        if(userRepository.getUserByEmail(user.getEmail()).isPresent())
//            return false;
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        userRepository.saveUser(
//                user.getEmail(),
//                user.getName(),
//                user.getPassword(),
//                Role.USER.toString(),
//                true);
//
//        return true;
//    }
//}
