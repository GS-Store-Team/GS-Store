package com.store.gs.services;

import com.store.gs.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class DarcyClientService {
    private final WebClient webClient;

    @Autowired
    public DarcyClientService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<User> getUserById(@PathVariable long id) {
        return webClient.get()
                .uri(String.join("/Users/", Long.toString(id)))
                .retrieve()
                .bodyToMono(User.class);
    }

    public Mono<User> authentification(@PathVariable long id) {
        return webClient.get()
                .uri(String.join("/Users/", Long.toString(id)))
                .retrieve()
                .bodyToMono(User.class);
    }
}
