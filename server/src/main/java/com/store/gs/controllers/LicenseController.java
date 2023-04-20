package com.store.gs.controllers;

import com.store.gs.dto.RefreshDTO;
import com.store.gs.models.User;
import com.store.gs.models.darcy.License;
import com.store.gs.models.darcy.UserDarcyAuth;
import com.store.gs.services.LicenseService;
import com.store.gs.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.ParseException;
import java.util.List;

@Controller
@RequestMapping("/licensing")
public class LicenseController {
    private final LicenseService licenseService;
    private final UserService userService;

    @Autowired
    public LicenseController(LicenseService licenseService, UserService userService) {
        this.licenseService = licenseService;
        this.userService = userService;
    }

    @Operation(summary = "Get licenses of user by his id")
    @GetMapping("/{id}")
    public ResponseEntity<List<License>> userLicenses(@PathVariable(name = "id") long id) {
        return ResponseEntity.ok(
                licenseService.getLicensesByUserId(id));
    }

    @Operation(summary = "Get licenses of current authenticated user")
    @GetMapping("/me/licenses")
    public ResponseEntity<List<License>> myLicenses(Authentication authentication) {
        return ResponseEntity.ok(
                licenseService.getLicensesByUserId(userService.getUserByEmail(authentication.getName()).getId())
        );
    }

    @PostMapping("/me/darcy")
    public UserDarcyAuth authDarcy(Authentication authentication,
                                   String nickname,
                                   String password) {
        if (authentication.isAuthenticated()) {
            return licenseService.login(nickname, password);
        } else return null;
    }

    //TODO: добавить обработку ошибок при рефреше и логине
    @PostMapping("/me/darcy")
    public ResponseEntity<?> refreshToken(Authentication authentication, RefreshDTO dto) {
        if (authentication.isAuthenticated()) {
            User user = userService.getUserByEmail(authentication.getName()); //??
            UserDarcyAuth userDarcyAuth = licenseService.getUserAuthByUserId(user.getId());
            RefreshDTO refreshDTO = licenseService.refreshToken(userDarcyAuth);
            return ResponseEntity.ok(refreshDTO);
        } else return null;
    }


    @PostMapping("/create")
    public void addLicense(Authentication authentication, License license) throws ParseException {
        licenseService.createLicense(license);
    }

    @GetMapping("/plugin/{id}")
    public ResponseEntity<List<License>> getLicensesByPluginId(@PathVariable(name = "id") long id) {
        return ResponseEntity.ok(licenseService.getLicensesByPluginId(id));
    }

    @GetMapping("/plugin/{company_name}")
    public ResponseEntity<List<License>> getLicensesByCompany(@PathVariable(name = "company_name") String companyName) {
        return ResponseEntity.ok(licenseService.getLicensesByCompanyName(companyName));
    }
}
