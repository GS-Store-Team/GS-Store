package com.store.gs.services;

import com.store.gs.dto.DarcyUserDTO;
import com.store.gs.dto.ShortProductDTO;
import com.store.gs.models.darcy.UserAuthData;
import com.store.gs.repositories.DarcyUserAuthDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class DarcyClientService {
    private final WebClient webClient;
    private final DarcyUserAuthDataRepository darcyUserAuthDataRepository;

    @Autowired
    public DarcyClientService(WebClient webClient, DarcyUserAuthDataRepository darcyUserAuthDataRepository) {
        this.webClient = webClient;
        this.darcyUserAuthDataRepository = darcyUserAuthDataRepository;
    }

    public DarcyUserDTO getUserById(long id) {
        return webClient.get()
                .uri(String.join("/Users/", Long.toString(id)))
                .retrieve()
                .bodyToMono(DarcyUserDTO.class)
                .block();
    }

   public List<ShortProductDTO> getProductsByUserId(long userId) {
        DarcyUserDTO userDTO = getUserById(userId);
        return userDTO.getProducts();
    }

    public UserAuthData login(String username, String password) {
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
                .bodyToMono(UserAuthData.class)
                .block();
    }

    public UserAuthData refreshToken(UserAuthData userAuthData) {
        MultiValueMap<String, String> userFormMap = new LinkedMultiValueMap<>();
        userFormMap.add("accessToken", userAuthData.getAccessToken());
        userFormMap.add("refreshToken", userAuthData.getRefreshToken());

        return webClient.post()
                .uri(String.join("/Authentication/token/refresh"))
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.TEXT_PLAIN)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromFormData(userFormMap))
                .retrieve()
                .bodyToMono(UserAuthData.class)
                .block();
    }
}
