package com.store.gs.controllers;

import com.store.gs.models.Plugin;
import com.store.gs.models.PluginLight;
import com.store.gs.services.PluginService;
import com.store.gs.utils.ControllersUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/plugins")
@RequiredArgsConstructor
public class PluginsController {
    private final PluginService pluginService;

    @GetMapping
    public Page<PluginLight> plugins(@RequestParam(name = "page", required = false) String pageId){
        int id = 0;
        if(pageId != null)
            try {
                id = Integer.parseInt(pageId)-1;
            } catch (NumberFormatException ignored){}

        return ControllersUtils.PluginToPluginLight(pluginService.getPage(id));
    }

    @GetMapping("/{id}")
    public Plugin plugin(@PathVariable("id") long id){
        return pluginService.getById(id);
    }

    @PostMapping
    public void addNewPlugin(@ModelAttribute("plugin") @Valid Plugin plugin,
                               BindingResult bindingResult){
        if(!bindingResult.hasErrors())
            pluginService.add(plugin);
    }

    @PatchMapping("/{id}")
    public void changePlugin(@PathVariable("id") long id,
                               @Valid @ModelAttribute("plugin") Plugin plugin,
                               BindingResult bindingResult){
        plugin.setId(id);
        if(!bindingResult.hasErrors())
            pluginService.changeById(plugin);
    }

    @DeleteMapping("/{id}")
    public void deletePlugin(@PathVariable("id") long id){
        pluginService.deleteById(id);
    }
}