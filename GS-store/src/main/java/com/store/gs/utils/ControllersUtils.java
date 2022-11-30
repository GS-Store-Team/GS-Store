package com.store.gs.utils;

import com.store.gs.models.Plugin;
import com.store.gs.models.PluginLight;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.BindingResult;

import java.util.Iterator;
import java.util.List;
import java.util.function.Function;
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
