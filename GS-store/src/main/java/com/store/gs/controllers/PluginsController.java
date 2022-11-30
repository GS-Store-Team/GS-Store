package com.store.gs.controllers;

import com.store.gs.models.Plugin;
import com.store.gs.services.PluginService;
import com.store.gs.utils.ControllersUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/plugins")
@RequiredArgsConstructor
public class PluginsController {
    private final PluginService pluginService;

    @GetMapping
    public ResponseEntity<Page<Plugin>> plugins(@RequestParam(name = "page", required = false) String pageId,
                                                @RequestParam(name = "_limit", required = false) String pageSize){
        Page<Plugin> page = pluginService.getPage(
                        ControllersUtils.parseIntParam(pageId),
                        ControllersUtils.parseIntParam(pageSize)
                    );

        return page.getTotalElements() == 0?
                ResponseEntity.noContent().build()
                :ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plugin> plugin(@PathVariable("id") long id){
        Plugin plugin = pluginService.getById(id);

        return plugin == null?
                ResponseEntity.noContent().build()
                :ResponseEntity.ok(plugin);
    }

    @PostMapping
    public ResponseEntity<?> addNewPlugin(@RequestBody @Valid Plugin plugin,
                                                          BindingResult bindingResult){

        if(bindingResult.hasErrors())
            return ResponseEntity.internalServerError().build();

        pluginService.add(plugin);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> changePlugin(@PathVariable("id") long id,
                             @RequestBody @Valid Plugin plugin,
                             BindingResult bindingResult){

        if(bindingResult.hasErrors())
            return ResponseEntity.internalServerError().build();

        pluginService.changeById(plugin);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlugin(@PathVariable("id") long id){
        pluginService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}