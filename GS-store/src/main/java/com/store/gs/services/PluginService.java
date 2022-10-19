package com.store.gs.services;

import com.store.gs.models.Plugin;
import com.store.gs.models.PluginLight;
import com.store.gs.repositories.PluginRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PluginService {
    private final PluginRepository pluginRepository;

    public PluginService(@Qualifier("InMemory") PluginRepository pluginRepository) {
        this.pluginRepository = pluginRepository;
    }

    public List<PluginLight> getPage(long pageNumber){
        return pluginRepository.getPage(pageNumber);
    }

    public Plugin getById(long id){
        return pluginRepository.getById(id);
    }

    public void add(Plugin plugin) {
        pluginRepository.add(plugin);
    }

    public void changeById(Plugin plugin, long id){
        pluginRepository.changeById(plugin, id);
    }
}
