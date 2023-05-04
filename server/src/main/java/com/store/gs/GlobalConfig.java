package com.store.gs;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class GlobalConfig {
    @Value("${user.default.description}")
    private String _USER_DEFAULT_DESCRIPTION;
    @Value("${user.default.email}")
    private String _USER_DEFAULT_EMAIL;
    @Value("${user.profile.pictures.max}")
    private Integer _USER_PICTURES_MAX;
    @Value("${plugin.pictures.max}")
    private Integer _PLUGIN_PICTURES_MAX;
}
