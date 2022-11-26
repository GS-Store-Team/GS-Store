package com.store.gs.services;

import com.store.gs.models.Plugin;
import com.store.gs.repositories.PluginRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class PluginService {
    private static final int cnt = 10;
    private final PluginRepository pluginRepository;

    public PluginService(PluginRepository pluginRepository) {
        this.pluginRepository = pluginRepository;
    }

    public Page<Plugin> getPage(int pageNumber){
        if(pageNumber < 0) pageNumber = 0;
        return pluginRepository.findAll(PageRequest.of(pageNumber,cnt));
    }

    public Plugin getById(long id){
        return pluginRepository.findById(id).orElse(null);
    }

    public void add(Plugin plugin) {
        pluginRepository.save(plugin);
    }

    public void changeById(Plugin plugin){
        pluginRepository.save(plugin);
    }

    public void deleteById(long id){
        pluginRepository.deleteById(id);
    }
}
