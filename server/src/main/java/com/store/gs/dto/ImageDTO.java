package com.store.gs.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class ImageDTO{
    private Long id;
    private String image;
    private String name;
    private Boolean isPreview;
}
