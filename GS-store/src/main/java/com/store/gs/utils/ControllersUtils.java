package com.store.gs.utils;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;
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
}
