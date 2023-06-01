package com.store.gs.controllers;

import com.store.gs.dto.ManagementPluginFilterDTO;
import com.store.gs.dto.VerifierDTO;
import com.store.gs.enums.PluginStatus;
import com.store.gs.models.Plugin;
import com.store.gs.services.plugin.PluginManagementService;
import com.store.gs.services.plugin.PluginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000"})
@RequiredArgsConstructor
@RequestMapping("/management")
@RestController
public class ManagementController {
    private final PluginService pluginService;
    private final PluginManagementService pluginManagementService;

    @PostMapping("/plugins")
    public List<Plugin> getPlugins(@RequestBody ManagementPluginFilterDTO filterDTO){
        return pluginService.pluginsForManagement(filterDTO);
    }

    @PostMapping("/plugins/{pluginId}")
    public void getPlugins(@PathVariable Long pluginId,
                           @RequestBody PluginStatus pluginStatus){
        pluginManagementService.managePlugin(pluginId, pluginStatus);
    }

    @GetMapping("/plugins/{pluginId}/verify")
    public VerifierDTO verifyPlugin(@PathVariable Long pluginId){
        return pluginManagementService.verify(pluginId);
    }
}
