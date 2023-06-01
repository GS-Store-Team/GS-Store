package com.store.gs.services.plugin;

import com.store.gs.dto.VerifierDTO;
import com.store.gs.enums.PluginStatus;
import com.store.gs.models.supportclasses.MultipartFileImpl;
import com.store.gs.repositories.PluginFileRepository;
import com.store.gs.repositories.PluginRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@Service
public class PluginManagementService {
    private final PluginRepository pluginRepository;
    private final PluginFileRepository pluginFileRepository;
    private final RestTemplate restTemplate;
    private static final String VERIFIER_URL = "http://localhost:8080/api/random";
    private static final Logger log = LoggerFactory.getLogger(PluginManagementService.class);

    public void managePlugin(Long pluginId, PluginStatus pluginStatus){
        var plugin = pluginRepository.findById(pluginId).get();
        plugin.setStatus(pluginStatus);
        pluginRepository.save(plugin);
    }

    public VerifierDTO verify(Long pluginId){
        var pluginFile = pluginFileRepository.findById(pluginId).get();

        var multipartFile = new MultipartFileImpl(pluginFile.getData());

        var response = restTemplate.postForEntity(
                VERIFIER_URL,
                multipartFile,
                VerifierDTO.class);

        log.info(String.format("Plugin's file with id %s was successfully verified", pluginFile.getId()));

        return response.getBody();
    }
}
