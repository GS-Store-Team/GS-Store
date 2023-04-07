package com.store.gs.converters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.function.Function;
import java.util.stream.Collectors;

public class PageConverter<T,V> {
    public Page<V> convert(Page<T> initialPage, Function<? super T, ? extends V> mapper){
        return new PageImpl<V>(
                initialPage.toList().stream().map(mapper).collect(Collectors.toList()),
                initialPage.getPageable(),
                initialPage.getTotalElements()
        );
    }
}
