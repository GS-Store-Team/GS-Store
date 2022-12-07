package com.store.gs.controllers;

import com.store.gs.dto.AuthenticationRequestDTO;
import com.store.gs.dto.AuthenticationResponseDTO;
import com.store.gs.models.User;
import com.store.gs.security.jwt.JwtTokenProvider;
import com.store.gs.services.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SecurityController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequestDTO auth) {

        String username = auth.getUsername();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, auth.getPassword()));

        User user = userService.getUserByEmail(username);

        if(user == null)
            throw  new UsernameNotFoundException("User with email " + username + " not found");

        String token = jwtTokenProvider.createToken(user);

        var response = new AuthenticationResponseDTO(username, token);

        return ResponseEntity.ok(response);
    }
}