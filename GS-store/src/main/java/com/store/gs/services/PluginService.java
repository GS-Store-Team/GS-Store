package com.store.gs.services;

import com.store.gs.models.Plugin;
import com.store.gs.models.PluginLight;
import com.store.gs.repositories.PluginRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PluginService {
    private static final int cnt = 10;
    private final PluginRepository pluginRepository;

    public PluginService(PluginRepository pluginRepository) {
        this.pluginRepository = pluginRepository;
    }

    public List<PluginLight> getPage(int pageNumber){
        if(pageNumber < 0) pageNumber = 0;
        Page<Plugin> plugins = pluginRepository.findAll(PageRequest.of(pageNumber,cnt));
        return plugins.getContent().stream().map(plugin -> {
            var pl = new PluginLight();
            pl.setId(plugin.getId());
            pl.setName(plugin.getName());
            pl.setMark(plugin.getMark());
            pl.setDescription(plugin.getShortDescription());
            return pl;
        }).collect(Collectors.toList());
    }

    public Plugin getById(long id){
        return pluginRepository.findById(id).orElse(new Plugin());
    }

    public void add(Plugin plugin) {
        pluginRepository.save(plugin);
    }

    public void changeById(Plugin plugin, long id){
        pluginRepository.save(plugin);
    }

    public void deleteById(long id){
        pluginRepository.deleteById(id);
    }
}
