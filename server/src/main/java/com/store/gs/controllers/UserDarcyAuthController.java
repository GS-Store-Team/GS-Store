package com.store.gs.controllers;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/darcy")
@AllArgsConstructor
public class UserDarcyAuthController {

    /*private final UserDarcyAuthService userDarcyAuthService;
    private final UserService userService;

    @PostMapping("/auth")
    public UserDarcyAuth authDarcy(Authentication authentication,
                                   String nickname,
                                   String password) {
        if (authentication.isAuthenticated()) {
            return userDarcyAuthService.login(nickname, password);
        } else return null;
    }

    //TODO: добавить обработку ошибок при рефреше и логине
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(Authentication authentication) {
        if (authentication.isAuthenticated()) {
            User user = userService.getUserByEmail(authentication.getName());
            UserDarcyAuth userDarcyAuth = userDarcyAuthService.getUserAuthByUserId(user.getId());
            RefreshDTO refreshDTO = userDarcyAuthService.refreshToken(userDarcyAuth);

            userDarcyAuth.setAccessToken(refreshDTO.getAccessToken());
            userDarcyAuth.setRefreshToken(refreshDTO.getRefreshToken());


            return ResponseEntity.ok(refreshDTO);
        } else return null;
   }*/
}
