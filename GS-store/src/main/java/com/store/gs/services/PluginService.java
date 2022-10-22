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
        return pluginRepository.getListByPage(pageNumber);
    }

    public Plugin getById(long id){
        return pluginRepository.getById(id);
    }

    public void add(Plugin plugin) {
        pluginRepository.create(plugin);
    }

    public void changeById(Plugin plugin, long id){
        pluginRepository.updateById(plugin, id);
    }
    public void deleteById(long id){
        pluginRepository.deleteById(id);
    }
}
