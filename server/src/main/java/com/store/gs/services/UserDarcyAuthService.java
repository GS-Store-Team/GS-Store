package com.store.gs.services;

import com.store.gs.repositories.UserDarcyAuthRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@AllArgsConstructor
public class UserDarcyAuthService {
    private final WebClient webClient;
    private final UserDarcyAuthRepository userDarcyAuthRepository;

    //Commented till better times

    /*public DarcyUserDTO getUserById(long id) {
        return webClient.get()
                .uri(String.join("/Users/", Long.toString(id)))
                .retrieve()
                .bodyToMono(DarcyUserDTO.class)
                .block();
    }

    public UserDarcyAuth getUserAuthByUserId(long userId) {
        return userDarcyAuthRepository.getUserAuthDataByUserId(userId);
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
    }*/
}
