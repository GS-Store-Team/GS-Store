package com.store.gs.controllers;

import com.store.gs.dto.FilterDTO;
import com.store.gs.models.Comment;
import com.store.gs.models.Plugin;
import com.store.gs.models.PluginFile;
import com.store.gs.services.CommentService;
import com.store.gs.services.plugin.PluginService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/plugins")
@RequiredArgsConstructor
public class PluginsController {
    private final PluginService pluginService;
    private final CommentService commentService;

    @PostMapping("/filter")
    public Page<Plugin> plugins(@RequestBody FilterDTO filter){
        return pluginService.getPage(filter);
    }

    @Operation(summary = "Get plugin by plugin-id")
    @GetMapping("/{id}")
    public ResponseEntity<Plugin> plugin(@PathVariable("id") long id){
        Plugin plugin = pluginService.getById(id);

        return plugin == null?
                ResponseEntity.noContent().build()
                :ResponseEntity.ok(plugin);
    }

    @Operation(summary = "New plugin")
    @PostMapping
    public ResponseEntity<?> addNewPlugin(@RequestBody @Valid Plugin plugin,
                                                          BindingResult bindingResult){

        if(bindingResult.hasErrors()) return ResponseEntity.unprocessableEntity().body(bindingResult.getAllErrors());

        pluginService.add(plugin);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update plugin by plugin-id")
    @PatchMapping("/{id}")
    public ResponseEntity<?> changePlugin(@PathVariable("id") long id,
                             @RequestBody @Valid Plugin plugin,
                             BindingResult bindingResult){

        if(bindingResult.hasErrors()) return ResponseEntity.unprocessableEntity().body(bindingResult.getAllErrors());

        pluginService.changeById(plugin);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Leave comment under current plugin")
    @PostMapping("/{id}/comment")
    public ResponseEntity<?> leaveComment(@PathVariable("id") long id,
                                          @RequestBody @Valid Comment comment,
                                          BindingResult bindingResult,
                                          Authentication authentication){
        if(bindingResult.hasErrors()) return ResponseEntity.unprocessableEntity().body(bindingResult.getAllErrors());

        commentService.addComment(id, comment, authentication);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Delete comment by comment-id")
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable("id") long id,
                                          Authentication authentication){

        boolean status = commentService.deleteComment(id, authentication);

        return status?
                ResponseEntity.ok().build():
                ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @Operation(summary = "Get page of comments related for current plugin-id")
    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getComments(@PathVariable("id") long id,
                                         @RequestParam(name = "_page",  required = false) Integer pageId,
                                         @RequestParam(name = "_limit", required = false) Integer pageSize,
                                         @RequestParam(name = "_type",  required = false) Integer sortingType,
                                         Authentication authentication){
        return ResponseEntity.ok(commentService.getCommentsForPluginId(id, pageId, pageSize, sortingType, authentication));
    }

    @Operation(summary = "Delete plugin by id")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlugin(@PathVariable("id") long id){
        pluginService.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get plugin file by plugin-id")
    @GetMapping("/{id}/file")
    public ResponseEntity<PluginFile> getPluginFile(@PathVariable("id") long id){

        PluginFile pluginFile = pluginService.getPluginFile(id);

        return pluginFile != null ?
                ResponseEntity.ok(pluginFile)
                :ResponseEntity.noContent().build();
    }

    @Operation(summary = "Upload plugin file with plugin-id")
    @PostMapping("/{id}/file")
    public ResponseEntity<?> uploadPluginFile(@PathVariable("id") long id,
                                              @RequestParam("_file") MultipartFile file) throws Exception {

        if(!file.isEmpty() && !file.getContentType().contains(".zip")) throw new FileUploadException();

        pluginService.uploadPluginFile(id, file);

        return ResponseEntity.ok().build();
    }


}