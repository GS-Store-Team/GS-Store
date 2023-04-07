package com.store.gs.converters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.LinkedList;
import java.util.List;

public class PageMerger<T> {
    public Page<T> merge(Page<T> page, Page<T> page1){
        List<T> resultList = new LinkedList<>();

        resultList.addAll(page.toList());
        resultList.addAll(page1.toList());

        return new PageImpl<>(resultList);
    }
}
