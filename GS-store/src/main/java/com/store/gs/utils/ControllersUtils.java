package com.store.gs.utils;

import com.store.gs.models.MyImage;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

public class ControllersUtils {
    public static String errors(BindingResult bindingResult){
        List<String> errors = bindingResult.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
        StringBuilder stringBuilder = new StringBuilder();
        errors.forEach(e -> stringBuilder.append(e).append(' '));
        return stringBuilder.toString();
    }

    public static int parseIntParam(String param){
        if(param != null)
            try {
                return Integer.parseInt(param);
            } catch (NumberFormatException ignored){}
        return 0;
    }

    public static void setImageToResponse(MyImage image , HttpServletResponse response) throws IOException {
        response.setContentType("image/jpeg");
        InputStream in = new ByteArrayInputStream(image.getData());
        IOUtils.copy(in, response.getOutputStream());
    }
}
