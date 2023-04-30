package com.store.gs.controllers;

import com.store.gs.models.User;
import com.store.gs.models.darcy.License;
import com.store.gs.models.darcy.UserDarcy;
import com.store.gs.services.LicenseService;
import com.store.gs.services.UserDarcyService;
import com.store.gs.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/licensing")
@AllArgsConstructor
public class LicenseController {
    private final LicenseService licenseService;
    private final UserService userService;
    private final UserDarcyService userDarcyService;

    private final String keySubstitution = "[---]";

    @PostMapping("/me/login")
    public ResponseEntity<?> loginDarcy(Authentication authentication,
                                        String username,
                                        String password) {
        if (authentication.isAuthenticated()) {
            UserDarcy userDarcy = userDarcyService.findByUsername(username);
            if (userDarcy.getPassword().equals(password)) {
                userDarcy.setLogged(true);
                userDarcyService.save(userDarcy);
                return ResponseEntity.ok(true);
            }
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
    }

    @PostMapping("/me/login")
    public void logoutDarcy(Authentication authentication) {
        if (authentication.isAuthenticated()) {
            User user = userService.getUserByEmail(authentication.getName());
            UserDarcy userDarcy = userService.getUserDataById(user.getId()).getUserDarcy();
            userDarcy.setLogged(false);
            userDarcyService.save(userDarcy);
        }
    }

    @Operation(summary = "Get licenses of user by his id")
    @GetMapping("/{id}")
    public ResponseEntity<List<License>> userLicenses(@PathVariable(name = "id") long id) {
        List<License> licenses = licenseService.getLicensesByUserId(id);
        for (License license : licenses) {
            license.setActivationKey(keySubstitution);
        }
        return ResponseEntity.ok(licenses);
    }

    @Operation(summary = "Get licenses of current authenticated user")
    @GetMapping("/me")
    public ResponseEntity<List<License>> myLicenses(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        UserDarcy userDarcy = userService.getUserDataById(user.getId()).getUserDarcy();
        if (userDarcy.isLogged()) {
            return ResponseEntity.ok(
                    licenseService.getLicensesByUserId(userService.getUserByEmail(authentication.getName()).getId())
            );
        }
        return ResponseEntity.ok(new ArrayList<>());
    }

    @PostMapping("/me/create")
    public void addLicense(Authentication authentication, License license) {
        User user = userService.getUserByEmail(authentication.getName());
        UserDarcy userDarcy = userService.getUserDataById(user.getId()).getUserDarcy();
        if (authentication.isAuthenticated()) {
            if (userDarcy.isLogged()) {
                licenseService.createLicense(license);
            }
        }
    }

    @PostMapping("/me/delete/{id}")
    public ResponseEntity<Boolean> deleteLicense(Authentication authentication, @PathVariable("id") long licenseId) {
        User user = userService.getUserByEmail(authentication.getName());
        UserDarcy userDarcy = userService.getUserDataById(user.getId()).getUserDarcy();
        if (authentication.isAuthenticated()) {
            if (userDarcy.isLogged()) {
                return ResponseEntity.ok(licenseService.deleteLicense(licenseId));
            }
        }
        return ResponseEntity.ok(false);
    }

    @GetMapping("/{plugin_id}")
    public ResponseEntity<List<License>> getLicensesByPluginId(@PathVariable(name = "plugin_id") long id) {
        List<License> licenses = licenseService.getLicensesByPluginId(id);
        for (License license : licenses) {
            license.setActivationKey(keySubstitution);
        }
        return ResponseEntity.ok(licenses);
    }

    @GetMapping("/{company_name}")
    public ResponseEntity<List<License>> getLicensesByCompany(@PathVariable(name = "company_name") String companyName) {
        List<License> licenses = licenseService.getLicensesByCompanyName(companyName);
        for (License license : licenses) {
            license.setActivationKey(keySubstitution);
        }
        return ResponseEntity.ok(licenses);
    }
}
