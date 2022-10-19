package com.store.gs.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter @Getter
public class PluginLight {
    private long id;
    private String name;
    private String description;
    private List<String> pictures;
    private double mark;

    public PluginLight(){}
}
