package com.store.gs.utils;

import com.store.gs.models.Image;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ControllersUtils {

    public static int parseIntParam(String param){
        if(param != null)
            try {
                return Integer.parseInt(param);
            } catch (NumberFormatException ignored){}
        return 0;
    }

    public static void setImageToResponse(Image image , HttpServletResponse response) throws IOException {
        response.setContentType("image/jpeg");
        InputStream in = new ByteArrayInputStream(image.getData());
        IOUtils.copy(in, response.getOutputStream());
    }

    public static Map<String, String> extractErrors(BindingResult bindingResult){
        Map<String, String> map  =new HashMap<>();

        List<FieldError> errors = bindingResult.getFieldErrors();
        errors.forEach(e -> map.put(e.getField(), e.getDefaultMessage()));

        return map;
    }

    public static String[] checkStringArray(String[] arr){
        return arr == null?
                new String[]{}:
                arr;
    }
}
