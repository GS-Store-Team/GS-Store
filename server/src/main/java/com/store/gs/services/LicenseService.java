package com.store.gs.services;

import com.store.gs.dto.DarcyUserDTO;
import com.store.gs.dto.RefreshDTO;
import com.store.gs.models.darcy.License;
import com.store.gs.models.darcy.UserDarcyAuth;
import com.store.gs.repositories.UserDarcyAuthRepository;
import com.store.gs.repositories.LicenseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@AllArgsConstructor
public class LicenseService {
    private final WebClient webClient;
    private final UserDarcyAuthRepository userDarcyAuthRepository;
    private final LicenseRepository licenseRepository;
    private final PluginService pluginService;

    public DarcyUserDTO getUserById(long id) {
        return webClient.get()
                .uri(String.join("/Users/", Long.toString(id)))
                .retrieve()
                .bodyToMono(DarcyUserDTO.class)
                .block();
    }

    public UserDarcyAuth getUserAuthByUserId(long userId) {
        return userDarcyAuthRepository.getUserAuthDataByUserId(userId);
    }

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

    public UserDarcyAuth login(String username, String password) {
        MultiValueMap<String, String> userFormMap = new LinkedMultiValueMap<>();
        userFormMap.add("username", username);
        userFormMap.add("password", password);

        return webClient.post()
                .uri(String.join("/Authentication"))
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.TEXT_PLAIN)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromFormData(userFormMap))
                .retrieve()
                .bodyToMono(UserDarcyAuth.class)
                .block();
    }

    public RefreshDTO refreshToken(UserDarcyAuth userDarcyAuth) {
        MultiValueMap<String, String> userFormMap = new LinkedMultiValueMap<>();
        userFormMap.add("accessToken", userDarcyAuth.getAccessToken());
        userFormMap.add("refreshToken", userDarcyAuth.getRefreshToken());

        return webClient.post()
                .uri(String.join("/Authentication/token/refresh"))
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.TEXT_PLAIN)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromFormData(userFormMap))
                .retrieve()
                .bodyToMono(RefreshDTO.class)
                .block();
    }

    public void createLicense(License license) {
        if (!licenseRepository.existsById(license.getId())) {
            licenseRepository.save(license);
        }
    }
}
