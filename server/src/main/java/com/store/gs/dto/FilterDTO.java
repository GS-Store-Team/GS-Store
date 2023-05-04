package com.store.gs.dto;

import com.store.gs.models.Category;
import com.store.gs.models.Tag;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class FilterDTO {
    private String value;
    private Category category;
    private List<Tag> selectedTags;
    private Boolean my;
    private Boolean bought;
    private Integer pageId;
    private Integer pageSize;
}