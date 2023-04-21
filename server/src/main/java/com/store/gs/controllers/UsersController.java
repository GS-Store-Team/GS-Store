package com.store.gs.controllers;

import com.store.gs.dto.ChangePasswordRequestDTO;
import com.store.gs.dto.UserDataDTO;
import com.store.gs.models.UserData;
import com.store.gs.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.nio.file.attribute.UserPrincipalNotFoundException;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/users")
public class UsersController {
    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Get data for current authenticated user")
    @GetMapping("/me")
    public UserDataDTO me(Authentication authentication){
        return userService.getUserDataFromCurrentUser(authentication);
    }

    @Operation(summary = "Update data for current authenticated user")
    @PatchMapping("/me")
    public ResponseEntity<?> me(@Valid @RequestBody UserData userData,
                                     BindingResult bindingResult){

        if(bindingResult.hasErrors()) return ResponseEntity.unprocessableEntity().body(bindingResult.getAllErrors());
        UserData updatedUserData = userService.updateUserdata(userData);

        return ResponseEntity.ok(updatedUserData);
    }

    @Operation(summary = "Change password for current authenticated user")
    @PatchMapping("/me/password")
    public ResponseEntity<?> changeAuthentication(@Valid @RequestBody ChangePasswordRequestDTO changePasswordRequestDTO,
                                                  BindingResult bindingResult,
                                                  Authentication authentication) throws UserPrincipalNotFoundException {

        if(bindingResult.hasErrors()) return ResponseEntity.unprocessableEntity().body(bindingResult.getAllErrors());

        boolean status = userService.updateUserAuthentication(authentication, changePasswordRequestDTO);

        return status?
                ResponseEntity.ok().build()
                :ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }

    @Operation(summary = "Delete data for current authenticated user: profile, user data, comments, related plugins. (But security user will not be deleted! User still will be able to enter with his login and password)")
    @DeleteMapping("/me")
    public ResponseEntity<?> deleteAccount(Authentication authentication) throws UserPrincipalNotFoundException {

        userService.deleteCurrentUser(authentication);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get data for user by user-id")
    @GetMapping("/{id}")
    public UserDataDTO userById(@PathVariable("id") long id){
        return userService.getUserDataById(id);
    }
}
