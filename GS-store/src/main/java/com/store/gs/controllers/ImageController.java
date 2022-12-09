package com.store.gs.controllers;

import com.store.gs.models.MyImage;
import com.store.gs.repositories.ImageRepository;
import com.store.gs.repositories.PluginRepository;
import com.store.gs.utils.ControllersUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageRepository imageRepository;
    private final PluginRepository pluginRepository;

    private final String PREFIX = "data:image/jpeg;base64,";

    @GetMapping("/{id}")
    public ResponseEntity<String> getImageById(@PathVariable("id") String imageId) {
        long id = ControllersUtils.parseIntParam(imageId);

        MyImage myImage = imageRepository.findById(id).orElseThrow();

        String encodedImage = Base64.encodeBase64String(myImage.getData());

        return ResponseEntity.ok(PREFIX + encodedImage);
    }

    @GetMapping("/plugin/{id}")
    public ResponseEntity<?> getImagesByPluginId(@PathVariable("id") String pluginId) {
        long id = ControllersUtils.parseIntParam(pluginId);

        List<Long> list = imageRepository.getImagesIdByPluginId(id);

        return ResponseEntity.ok(list);
    }

    @GetMapping("/plugin/{id}/preview")
    public ResponseEntity<String> getPreviewByPluginId(@PathVariable("id") String pluginId) {
        long id = ControllersUtils.parseIntParam(pluginId);

        MyImage myImage = imageRepository.getPreviewByPluginId(id).orElseThrow();

        String encodedImage = Base64.encodeBase64String(myImage.getData());

        return ResponseEntity.ok(PREFIX + encodedImage);
    }



    @PatchMapping("/{id}")
    public ResponseEntity<?> setPreviewImage(@RequestParam(name = "plugin_id") String pluginId,
                                             @PathVariable("id") String imageId){
        long imgId = ControllersUtils.parseIntParam(imageId);
        long plgId = ControllersUtils.parseIntParam(pluginId);

        imageRepository.UnSetPreviewById(plgId);
        imageRepository.setPreviewById(imgId);

        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<?> newImageForPluginId(@RequestParam(name ="_plugin_id") String pluginId,
                                                 @RequestParam("file") MultipartFile file) throws Exception {

        if(!file.isEmpty() && !file.getContentType().contains("image")) throw new FileUploadException();

        long id = ControllersUtils.parseIntParam(pluginId);
        if(pluginRepository.existsById(id)){
            MyImage myImage = new MyImage();
            myImage.setPluginId(id);
            myImage.setData(file.getBytes());
            imageRepository.save(myImage);
        }

        return ResponseEntity.noContent().build();
    }
}
