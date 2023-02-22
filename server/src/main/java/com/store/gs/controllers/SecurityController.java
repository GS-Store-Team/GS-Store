package com.store.gs.controllers;

import com.store.gs.dto.AuthenticationRequestDTO;
import com.store.gs.dto.AuthenticationResponseDTO;
import com.store.gs.models.User;
import com.store.gs.security.jwt.JwtTokenProvider;
import com.store.gs.services.UserService;
import com.store.gs.utils.ControllersUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class SecurityController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationRequestDTO auth,
                                   BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return new ResponseEntity<>(ControllersUtils.extractErrors(bindingResult), HttpStatus.UNPROCESSABLE_ENTITY);

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(auth.getUsername(), auth.getPassword()));
        User user = userService.getUserByEmail(auth.getUsername());

        if(user == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        String token = jwtTokenProvider.createToken(user);

        return ResponseEntity.ok(new AuthenticationResponseDTO(auth.getUsername(), token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody @Valid AuthenticationRequestDTO signUp,
                                    BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return new ResponseEntity<>(ControllersUtils.extractErrors(bindingResult), HttpStatus.UNPROCESSABLE_ENTITY);

        boolean state = userService.createNewUser(signUp.getUsername(), signUp.getPassword());

        return state?
                ResponseEntity.ok().build():
                new ResponseEntity<>(HttpStatus.CONFLICT);
    }
}