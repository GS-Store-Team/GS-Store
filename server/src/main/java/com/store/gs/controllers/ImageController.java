package com.store.gs.controllers;

import com.store.gs.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String getImage(@PathVariable("id") Long id) {
        return imageService.getImage(id);
    }

    @GetMapping("/plugin/{id}/preview")
    @ResponseStatus(HttpStatus.OK)
    public String getPreviewForPlugin(@PathVariable("id") Long id) {
        return imageService.getPreviewForPlugin(id);
    }

    @GetMapping("/user/preview")
    @ResponseStatus(HttpStatus.OK)
    public String getPreviewForUser() {
        return imageService.getPreviewForUser();
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void setPreviewForPlugin(@RequestParam(name = "_plugin_id") Long pluginId,
                                                 @PathVariable("id") Long id){
        imageService.setPreviewForPlugin(id, pluginId);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void setPreviewForUser(@PathVariable("id") Long id){
        imageService.setPreviewForUser(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadImageForPlugin(@RequestParam("_plugin_id") Long id,
                                     @RequestParam("_file") MultipartFile image) {
        imageService.uploadImageForPlugin(id, image);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadImageForUser(@RequestParam("_file") MultipartFile image) {
        imageService.uploadImageForUser(image);
    }
}
