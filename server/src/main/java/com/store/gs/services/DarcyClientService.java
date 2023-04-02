package com.store.gs.services;

import com.store.gs.models.User;
import com.store.gs.models.darcy.UserAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class DarcyClientService {
    private final WebClient webClient;

    @Autowired
    public DarcyClientService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<User> getUserById(long id) {
        return webClient.get()
                .uri(String.join("/Users/", Long.toString(id)))
                .retrieve()
                .bodyToMono(User.class);
    }

    public UserAuth auth(String username, String password) {
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
                .bodyToMono(UserAuth.class)
                .block();
    }

    public UserAuth refreshToken(UserAuth userAuth) {
        MultiValueMap<String, String> userFormMap = new LinkedMultiValueMap<>();
        userFormMap.add("accessToken", userAuth.getAccessToken());
        userFormMap.add("refreshToken", userAuth.getRefreshToken());

        return webClient.post()
                .uri(String.join("/Authentication/token/refresh"))
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.TEXT_PLAIN)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromFormData(userFormMap))
                .retrieve()
                .bodyToMono(UserAuth.class)
                .block();
    }
}
