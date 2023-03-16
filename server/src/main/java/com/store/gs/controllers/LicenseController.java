package com.store.gs.controllers;

import com.store.gs.dto.LicenseRequestDTO;
import com.store.gs.models.license.LicenseData;
import com.store.gs.repositories.LicenseDataRepository;
import com.store.gs.services.LicenseDataService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("https://lk.darcy.nntc.pro")
public class LicenseController {
    private final LicenseDataRepository licenseDataRepository;
    private final LicenseDataService licenseDataService;

    @GetMapping("/Licenses/{id}/info")
    public ResponseEntity<LicenseData> getLicenseDataById(@PathVariable long id, LicenseRequestDTO dto) {
        LicenseData licenseDataObject = licenseDataService.dtoToLicenseData(dto);
        return ResponseEntity.ok(licenseDataObject);
    }
}
