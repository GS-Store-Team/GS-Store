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

    public static Page<PluginLight> PluginToPluginLight(Page<Plugin> plugins){

        Page<PluginLight> page = new Page<PluginLight>() {
            @Override
            public int getTotalPages() {
                return plugins.getTotalPages();
            }

            @Override
            public long getTotalElements() {
                return plugins.getTotalElements();
            }

            @Override
            public <U> Page<U> map(Function<? super PluginLight, ? extends U> converter) {
                return null;
            }

            @Override
            public int getNumber() {
                return plugins.getNumber();
            }

            @Override
            public int getSize() {
                return plugins.getSize();
            }

            @Override
            public int getNumberOfElements() {
                return plugins.getNumberOfElements();
            }

            @Override
            public List<PluginLight> getContent() {
                return plugins.getContent().stream().map(PluginLight::new).collect(Collectors.toList());
            }

            @Override
            public boolean hasContent() {
                return plugins.hasContent();
            }

            @Override
            public Sort getSort() {
                return plugins.getSort();
            }

            @Override
            public boolean isFirst() {
                return plugins.isFirst();
            }

            @Override
            public boolean isLast() {
                return plugins.isLast();
            }

            @Override
            public boolean hasNext() {
                return plugins.hasNext();
            }

            @Override
            public boolean hasPrevious() {
                return plugins.hasPrevious();
            }

            @Override
            public Pageable nextPageable() {
                return plugins.nextPageable();
            }

            @Override
            public Pageable previousPageable() {
                return plugins.previousPageable();
            }

            @Override
            public Iterator<PluginLight> iterator() {
                return plugins.stream().map(PluginLight::new).iterator();
            }
        };

        return page;
    }
}
