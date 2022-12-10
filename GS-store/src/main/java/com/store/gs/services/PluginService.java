package com.store.gs.services;

import com.store.gs.models.Plugin;
import com.store.gs.repositories.PluginRepository;
import com.store.gs.security.SecurityUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class PluginService {
    private final PluginRepository pluginRepository;

    public PluginService(PluginRepository pluginRepository) {
        this.pluginRepository = pluginRepository;
    }

    public Page<Plugin> getPage(int pageNumber,
                                int limit,
                                String filter,
                                long category,
                                String[] tags){
        if(pageNumber < 1) pageNumber = 1;
        if(limit <= 5) limit = 5;

        if(tags.length==0)
            if(category==-1)
                if(filter == null)
                    return pluginRepository.findAll(PageRequest.of(pageNumber - 1, limit));
                else
                    return pluginRepository.findAllByNameContainingIgnoreCase(filter, PageRequest.of(pageNumber-1, limit));
            else
                if(filter == null) {
                    List<Plugin> plugins = pluginRepository.findAllByCategoryId(category, limit, (long) (pageNumber - 1) * limit);

                    int totalElem = pluginRepository.findCountOfAllByCategoryId(category);

                    Page<Plugin> p = new PageImpl<>(plugins, PageRequest.of((pageNumber-1), limit), totalElem);
                    return p;
                }
                else {
                    List<Plugin> plugins = pluginRepository.findAllByCategoryIdAndFilter(filter, category, limit, (long) (pageNumber - 1) * limit);

                    int totalElem = pluginRepository.findCountOfAllByCategoryIdAndFilter(filter, category);

                    Page<Plugin> p = new PageImpl<>(plugins, PageRequest.of((pageNumber-1), limit), totalElem);
                    return p;
                }

        return pluginRepository.findAll(PageRequest.of(pageNumber-1,limit));
    }

    public Plugin getById(long id){
        return pluginRepository.findById(id).orElse(null);
    }

    public void  add(Plugin plugin) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();

        plugin.setDeveloper(securityUser.getUsername());

        pluginRepository.save(plugin);
    }

    public void changeById(Plugin plugin){
        pluginRepository.save(plugin);
    }

    public void deleteById(long id){
        pluginRepository.deleteById(id);
    }
}