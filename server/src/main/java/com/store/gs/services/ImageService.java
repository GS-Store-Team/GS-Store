package com.store.gs.services;

import com.store.gs.exceptions.ImagesCountLimitExceededException;
import com.store.gs.exceptions.NotImageException;
import com.store.gs.exceptions.NotYourImageException;
import com.store.gs.GlobalConfig;
import com.store.gs.dto.ImageDTO;
import com.store.gs.models.Image;
import com.store.gs.models.Plugin;
import com.store.gs.models.UserData;
import com.store.gs.models.supportclasses.PluginImageRef;
import com.store.gs.models.supportclasses.UserdataImageRef;
import com.store.gs.repositories.ImageRepository;
import com.store.gs.repositories.PluginRepository;
import com.store.gs.repositories.UserDataRepository;
import com.store.gs.utils.ServiceUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final GlobalConfig config;
    private final ImageRepository imageRepository;
    private final PluginRepository pluginRepository;
    private final UserDataRepository userDataRepository;
    private final String PREFIX = "data:image/jpeg;base64,";

    public ImageDTO getImage(Long id){
        Image image = imageRepository.findById(id).orElseThrow();

        return new ImageDTO(
                image.getId(),
                wrap(Base64.encodeBase64String(image.getData())),
                image.getName(),
                image.isPreview()
        );
    }

    public ImageDTO getPreviewForPlugin(Long id){
        Plugin plugin = pluginRepository.findById(id).orElseThrow();

        List<Long> ids = plugin.getImages().stream().map(PluginImageRef::getImageId).toList();

        if(ids.size() == 0) throw new NoSuchElementException();

        Image image = imageRepository.getPreviewByIds(ids).orElseThrow();

        return new ImageDTO(
                image.getId(),
                wrap(Base64.encodeBase64String(image.getData())),
                image.getName(),
                image.isPreview()
        );
    }

    public ImageDTO getPreviewForUser(){
        UserData userData = userDataRepository.findById(ServiceUtils.getUserId()).orElseThrow();

        List<Long> ids = userData.getImages().stream().map(UserdataImageRef::getImageId).toList();

        if(ids.size() == 0) throw new NoSuchElementException();

        Image image = imageRepository.getPreviewByIds(ids).orElseThrow();

        return new ImageDTO(
                image.getId(),
                wrap(Base64.encodeBase64String(image.getData())),
                image.getName(),
                image.isPreview()
        );
    }

    public void uploadImageForPlugin(Long id, MultipartFile file, String name){
        if(!ServiceUtils.isImage(file)) throw new NotImageException();

        Plugin plugin = pluginRepository.findById(id).orElseThrow();
        System.out.println(plugin);
        Set<PluginImageRef> imageRefs = plugin.getImages();

        if(imageRefs.size() + 1 > config.get_PLUGIN_PICTURES_MAX()) throw new ImagesCountLimitExceededException();

        try {
            Image image = new Image(file.getBytes(), imageRefs.size() == 0, name);
            image = imageRepository.save(image);

            imageRefs.add(new PluginImageRef(image.getId(), plugin.getId()));
            plugin.setImages(imageRefs);

            pluginRepository.save(plugin);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void uploadImageForUser(MultipartFile file, String name){
        if(!ServiceUtils.isImage(file)) throw new NotImageException();

        UserData userData = userDataRepository.findById(ServiceUtils.getUserId()).orElseThrow();
        Set<UserdataImageRef> imageRefs = userData.getImages();

        if(imageRefs.size() + 1 > config.get_USER_PICTURES_MAX()) throw new ImagesCountLimitExceededException();

        try {
            Image image = new Image(file.getBytes(), imageRefs.size() == 0, name);
            image = imageRepository.save(image);

            imageRefs.add(new UserdataImageRef(image.getId(), ServiceUtils.getUserId()));
            userData.setImages(imageRefs);

            userDataRepository.save(userData);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void setPreviewForPlugin(Long id, Long pluginId){
        Plugin plugin = pluginRepository.findById(pluginId).orElseThrow();

        List<Long> ids = plugin.getImages().stream().map(PluginImageRef::getImageId).toList();

        if(!ids.contains(id)) throw new NotYourImageException();

        Image preview = imageRepository.getPreviewByIds(ids).orElseThrow();

        imageRepository.UnsetPreviewById(preview.getId());

        imageRepository.setPreviewById(id);
    }

    public void setPreviewForUser(Long id){

        UserData userData = userDataRepository.findById(ServiceUtils.getUserId()).orElseThrow();

        List<Long> ids = userData.getImages().stream().map(UserdataImageRef::getImageId).toList();

        if(!ids.contains(id)) throw new NotYourImageException();

        Image preview = imageRepository.getPreviewByIds(ids).orElseThrow();

        imageRepository.UnsetPreviewById(preview.getId());

        imageRepository.setPreviewById(id);
    }

    private String wrap(String body){
        return PREFIX + body;
    }
}