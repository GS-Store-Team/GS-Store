package com.store.gs.utils;

import com.store.gs.security.SecurityUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.multipart.MultipartFile;

public class ServiceUtils {
    public static boolean isImage(MultipartFile file){
        return !file.isEmpty() && file.getContentType().contains("image");
    }

    public static Long getUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();

        return securityUser.getId();
    }
}
