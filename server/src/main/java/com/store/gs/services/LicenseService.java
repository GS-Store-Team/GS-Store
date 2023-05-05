package com.store.gs.services;

import com.store.gs.models.User;
import com.store.gs.models.darcy.License;
import com.store.gs.models.darcy.UserDarcy;
import com.store.gs.repositories.LicenseRepository;
import com.store.gs.utils.LicenseKeyGenerator;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LicenseService {
    private final UserDarcyService userDarcyService;
    private final UserService userService;
    private final LicenseRepository licenseRepository;


    //Commented due to lack of data acquiring methods
   /* public License requestLicenseById(long licenseId) {

        License license = licenseRepository.findById(licenseId).orElseThrow();
        return license;
        /*LicenseRequestDTO dto = webClient.get()
                .uri(String.join("/Licenses/", Long.toString(licenseId), "/grants"))
                .retrieve()
                .bodyToMono(LicenseRequestDTO.class)
                .block();
        dto
    }*/


    public List<License> getLicensesByUserId(long userId) {
        return licenseRepository.findAllByOwnerId(userId);
    }

    public List<License> getLicensesByPluginId(long pluginId) {
        return licenseRepository.findAllByPluginId(pluginId);
    }

    public List<License> getLicensesByCompanyName(String companyName) {
        return licenseRepository.findAllByCompany(companyName);
    }

    public void createLicense(License license) {
        if (!licenseRepository.existsById(license.getId())) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = userService.getUserByEmail(authentication.getName());
            UserDarcy userDarcy = userService.getUserDataById(user.getId()).getUserDarcy();

            license.setOwner(userDarcy);
            license.setActivationKey(LicenseKeyGenerator.generate());

            licenseRepository.save(license);
        }
    }

    public boolean deleteLicense(long licenseId) {
        if (licenseRepository.existsById(licenseId)) {
            licenseRepository.deleteLicenseDataById(licenseId);
            return true;
        }
        return false;
    }
}
