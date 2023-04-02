package com.store.gs.services;

import com.store.gs.dto.LicenseRequestDTO;
import com.store.gs.models.darcy.LicenseData;
import com.store.gs.repositories.LicenseDataRepository;
import com.store.gs.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LicenseDataService {
    private final LicenseDataRepository licenseDataRepository;
    private final UserRepository userRepository;
    public LicenseData dtoToLicenseData(LicenseRequestDTO dto) {
        LicenseData licenseData = new LicenseData();
        licenseData.setId(dto.getId());
        licenseData.setTitle(dto.getTitle());
        licenseData.setOwnerId(userRepository.getUserByEmail(dto.getUser()).get().getId());
        //licenseData.setPluginId(dto.get);
        //licenseData.setActivationDate();
        //licenseData.setExpireDate();

        return licenseData;
    }
}
