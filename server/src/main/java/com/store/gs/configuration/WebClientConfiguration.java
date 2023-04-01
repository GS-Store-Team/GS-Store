package com.store.gs.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@Setter
@Getter
public class WebClientConfiguration {
    public static final String darcyBaseUrl = "https://lk.darcy.nntc.pro";
    @Bean
    public WebClient restTemplate() {
         return WebClient.create(darcyBaseUrl);
    }
}
