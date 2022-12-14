package com.store.gs.controllers;

import com.store.gs.models.Plugin;
import com.store.gs.models.supportclasses.CategoryRef;
import com.store.gs.repositories.PluginRepository;
import com.store.gs.services.PluginService;
import com.store.gs.utils.ControllersUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/plugins")
@RequiredArgsConstructor
public class PluginsController {
    private final PluginService pluginService;
    private final PluginRepository pluginRepository;

    @GetMapping("/test")
    public ResponseEntity<?> plgs(@RequestParam(name = "_page", required = false) String pageId,
                                  @RequestParam(name = "_limit", required = false) String pageSize,
                                  @RequestParam(name = "_filter", required = false) String filter,
                                  @RequestParam(name = "_tag", required = false) String[] tags){

        if(filter == null)return ResponseEntity.ok(pluginRepository.findAll(Pageable.ofSize(10)));

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Page<Plugin>> plugins(@RequestParam(name = "_page", required = false) String pageId,
                                                @RequestParam(name = "_limit", required = false) String pageSize,
                                                @RequestParam(name = "_filter", required = false) String filter,
                                                @RequestParam(name = "_cat", required = false) String category,
                                                @RequestParam(name = "_tag", required = false) String[] tags){
        long categoryId = -1;
        if(category != null) categoryId = ControllersUtils.parseIntParam(category);

        Page<Plugin> page = pluginService.getPage(
                        ControllersUtils.parseIntParam(pageId),
                        ControllersUtils.parseIntParam(pageSize),
                        filter,
                        categoryId,
                        ControllersUtils.checkStringArray(tags)
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
            return ResponseEntity.badRequest().build();

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