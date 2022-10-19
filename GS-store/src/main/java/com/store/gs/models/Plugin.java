package com.store.gs.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@Setter @Getter
@ToString
public class Plugin {
    private long id;
    private String name;
    private String description;
    private List<String> pictures;
    private double mark;
    private List<Long> revives;
    private BigDecimal price;
    private List<Category> categories;
    private List<String> hashtags;

    public Plugin() {}
}
