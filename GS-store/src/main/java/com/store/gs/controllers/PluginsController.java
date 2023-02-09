package com.store.gs.controllers;

import com.store.gs.dto.CommentDTO;
import com.store.gs.models.Comment;
import com.store.gs.models.Plugin;
import com.store.gs.services.CommentService;
import com.store.gs.services.PluginService;
import com.store.gs.utils.ControllersUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/plugins")
@RequiredArgsConstructor
public class PluginsController {
    private final PluginService pluginService;
    private final CommentService commentService;

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
        System.out.println("HERE");
        Plugin plugin = pluginService.getById(id);

        return plugin == null?
                ResponseEntity.noContent().build()
                :ResponseEntity.ok(plugin);
    }

    @PostMapping
    public ResponseEntity<?> addNewPlugin(@RequestBody @Valid Plugin plugin,
                                                          BindingResult bindingResult){

        if(bindingResult.hasErrors()) return ResponseEntity.unprocessableEntity().body(bindingResult.getAllErrors());

        pluginService.add(plugin);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> changePlugin(@PathVariable("id") long id,
                             @RequestBody @Valid Plugin plugin,
                             BindingResult bindingResult){

        if(bindingResult.hasErrors()) return ResponseEntity.unprocessableEntity().body(bindingResult.getAllErrors());

        pluginService.changeById(plugin);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<?> leaveComment(@PathVariable("id") long id,
                                          @RequestBody @Valid CommentDTO commentDTO,
                                          BindingResult bindingResult,
                                          Authentication authentication){

        if(bindingResult.hasErrors()) return ResponseEntity.unprocessableEntity().body(bindingResult.getAllErrors());

        commentService.addComment(id, Comment.fromDTO(commentDTO), authentication);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getComments(@PathVariable("id") long id){

        return ResponseEntity.ok(commentService.getCommentsForPluginId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlugin(@PathVariable("id") long id){
        pluginService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}