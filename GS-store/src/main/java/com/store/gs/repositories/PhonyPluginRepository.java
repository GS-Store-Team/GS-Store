package com.store.gs.repositories;

import com.store.gs.models.Plugin;
import com.store.gs.models.PluginLight;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@Qualifier("InMemory")
public class PhonyPluginRepository implements PluginRepository{

    private static final int pluginCount = 10;
    private static long cnt = 0;
    private static Plugin nullPlugin;
    private List<Plugin> plugins;
    {
        nullPlugin = new Plugin();
        nullPlugin.setId(-1);
        nullPlugin.setName("NULL");
        nullPlugin.setDescription("NULL");


        plugins = new ArrayList<>();
        var p = new Plugin();
        p.setId(cnt++);
        p.setName("First");
        p.setDescription("Some description");
        plugins.add(p);

        p = new Plugin();
        p.setId(cnt++);
        p.setName("Second");
        p.setDescription("Some description");
        plugins.add(p);

        p = new Plugin();
        p.setId(cnt++);
        p.setName("Third");
        p.setDescription("Some description");
        plugins.add(p);
    }

    private PluginLight pToPlMapper(Plugin p){
        var pluginLight = new PluginLight();
        pluginLight.setId(p.getId());
        pluginLight.setName(p.getName());
        pluginLight.setDescription(p.getDescription());
        pluginLight.setMark(p.getMark());
        return pluginLight;
    }
    @Override
    public List<PluginLight> getListByPage(long pageNumber){
        try {
            return plugins.subList((int) (pageNumber * 10), (int) (pageNumber * 10 +10)).stream().map(this::pToPlMapper).collect(Collectors.toList());
        }catch (IndexOutOfBoundsException e){
            return plugins.stream().map(this::pToPlMapper).collect(Collectors.toList());
        }
    }

    @Override
    public Plugin getById(long id) {
        return plugins.stream().filter(p -> p.getId() == id).findFirst().orElse(nullPlugin);
    }

    @Override
    public void create(Plugin plugin) {
        plugin.setId(cnt++);
        plugins.add(plugin);
    }
    @Override
    public void deleteById(long id){
        plugins = plugins.stream().filter(p -> p.getId() != id).collect(Collectors.toList());
    }
    @Override
    public void updateById(Plugin plugin, long id){
        var oldPlugin = getById(id);
        if(oldPlugin == nullPlugin) return;
        oldPlugin.setName(plugin.getName());
        oldPlugin.setDescription(plugin.getDescription());
        oldPlugin.setPrice(plugin.getPrice());
        oldPlugin.setPictures(plugin.getPictures());
    }
}
