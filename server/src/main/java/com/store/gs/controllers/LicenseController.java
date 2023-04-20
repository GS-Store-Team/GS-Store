package com.store.gs.controllers;

import com.store.gs.models.darcy.License;
import com.store.gs.services.LicenseService;
import com.store.gs.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/licensing")
@AllArgsConstructor
public class LicenseController {
    private final LicenseService licenseService;
    private final UserService userService;

    @Operation(summary = "Get licenses of user by his id")
    @GetMapping("/{id}")
    public ResponseEntity<List<License>> userLicenses(@PathVariable(name = "id") long id) {
        return ResponseEntity.ok(
                licenseService.getLicensesByUserId(id));
    }

    @Operation(summary = "Get licenses of current authenticated user")
    @GetMapping("/me")
    public ResponseEntity<List<License>> myLicenses(Authentication authentication) {
        return ResponseEntity.ok(
                licenseService.getLicensesByUserId(userService.getUserByEmail(authentication.getName()).getId())
        );
    }

    @PostMapping("/me/create")
    public void addLicense(Authentication authentication, License license) {
        if (authentication.isAuthenticated()) {
            licenseService.createLicense(license);
        }
    }

    @GetMapping("/{plugin_id}")
    public ResponseEntity<List<License>> getLicensesByPluginId(@PathVariable(name = "plugin_id") long id) {
        return ResponseEntity.ok(licenseService.getLicensesByPluginId(id));
    }

    @GetMapping("/{company_name}")
    public ResponseEntity<List<License>> getLicensesByCompany(@PathVariable(name = "company_name") String companyName) {
        return ResponseEntity.ok(licenseService.getLicensesByCompanyName(companyName));
    }
}
