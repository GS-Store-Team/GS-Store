package com.store.gs.services;

import com.store.gs.models.darcy.License;
import com.store.gs.repositories.LicenseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@AllArgsConstructor
public class LicenseService {
    private final WebClient webClient;
    private final LicenseRepository licenseRepository;
    private final PluginService pluginService;



    //Commented due to lack of data acquiring methods
    /*public License requestLicenseDataById(long licenseId) {
        LicenseRequestDTO dto = webClient.get()
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
            licenseRepository.save(license);
        }
    }
}
