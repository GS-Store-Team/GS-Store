package com.store.gs.models;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class PluginLight{
    public  PluginLight(Plugin plugin){
        this.id = plugin.getId();
        this.name = plugin.getName();
        this.shortDescription = plugin.getShortDescription();
        this.mark = plugin.getMark();
    }
    private long id;
    private String name;
    private String shortDescription;
    private double mark;
}