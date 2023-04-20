package com.store.gs.controllers;

import com.store.gs.dto.ImageDTO;
import com.store.gs.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/{id}")
    public ImageDTO getImage(@PathVariable("id") Long id) {
        return imageService.getImage(id);
    }

    @GetMapping("/plugin/{id}/preview")
    @ResponseStatus(HttpStatus.OK)
    public ImageDTO getPreviewForPlugin(@PathVariable("id") Long id) {
        return imageService.getPreviewForPlugin(id);
    }

    @GetMapping("/user/preview")
    public ImageDTO getPreviewForUser() {
        return imageService.getPreviewForUser();
    }

    @PatchMapping("/plugin/{id}/preview/{image_id}")
    public void setPreviewForPlugin(@PathVariable("id")  Long id,
                                    @PathVariable("image_id") Long imageId){
        imageService.setPreviewForPlugin(imageId, id);
    }

    @PatchMapping("/user/preview/{image_id}")
    public void setPreviewForUser(@PathVariable("image_id") Long id){
        imageService.setPreviewForUser(id);
    }

    @PostMapping("/plugin/{id}")
    public void uploadImageForPlugin(@PathVariable("id") Long id,
                                     @RequestParam("_file") MultipartFile image) {
        imageService.uploadImageForPlugin(id, image);
    }

    @PostMapping("/user")
    public void uploadImageForUser(@RequestParam("_file") MultipartFile image) {
        imageService.uploadImageForUser(image);
    }
}
