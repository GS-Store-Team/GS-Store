package com.store.gs.repositories;

import com.store.gs.models.Plugin;
import com.store.gs.models.PluginLight;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@Qualifier("InMemory")
public class PhonyPluginRepository implements PluginRepository{

    private static final int pluginCount = 10;
    private static long cnt = 0;
    private List<PluginLight> pluginsLight;
    private List<Plugin> plugins;
    {
        pluginsLight = new ArrayList<>();
        plugins = new ArrayList<>();

        var pl = new PluginLight();
        pl.setId(cnt++);
        pl.setName("Valera");
        pl.setDescription("asdadadasd");
        pluginsLight.add(pl);
        var p = new Plugin();
        p.setId(pl.getId());
        p.setName(pl.getName());
        p.setDescription(pl.getDescription());
        plugins.add(p);

        pl = new PluginLight();
        pl.setId(cnt++);
        pl.setName("Egor");
        pl.setDescription("bgbfbfg");
        pluginsLight.add(pl);
        p = new Plugin();
        p.setId(pl.getId());
        p.setName(pl.getName());
        p.setDescription(pl.getDescription());
        plugins.add(p);

        pl = new PluginLight();
        pl.setId(cnt++);
        pl.setName("Igor");
        pl.setDescription("qweewrqwrwrqw");
        pluginsLight.add(pl);
        p = new Plugin();
        p.setId(pl.getId());
        p.setName(pl.getName());
        p.setDescription(pl.getDescription());
        plugins.add(p);
    }


    @Override
    public List<PluginLight> getPage(long pageNumber){
        try {
            return pluginsLight.subList((int) (pageNumber * 10), (int) (pageNumber * 11));
        }catch (IndexOutOfBoundsException e){
            return pluginsLight;
        }
    }

    @Override
    public Plugin getById(long id) {
        return plugins.stream().filter(p -> p.getId() == id).findFirst().orElse(new Plugin());
    }

    @Override
    public void add(Plugin plugin) {
        plugin.setId(cnt++);
        plugins.add(plugin);
        var pl = new PluginLight();
        pl.setId(plugin.getId());
        pl.setName(plugin.getName());
        pl.setDescription(plugin.getDescription());
        pl.setMark(plugin.getMark());
        pluginsLight.add(pl);
    }
    @Override
    public void deleteById(long id){
        PluginLight pl = pluginsLight.stream().filter(p -> p.getId() == id).findFirst().orElse(new PluginLight());
        pluginsLight.remove(pl);

        Plugin plugin = plugins.stream().filter(p -> p.getId() == id).findFirst().orElse(new Plugin());
        plugins.remove(plugin);
    }
    @Override
    public void changeById(Plugin plugin, long id){
        deleteById(id);
        add(plugin);
    }
}
