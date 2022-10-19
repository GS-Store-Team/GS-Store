package com.store.gs.repositories;

import com.store.gs.models.Plugin;
import com.store.gs.models.PluginLight;

import java.util.List;

public interface PluginRepository {
    List<PluginLight> getPage(long pageNum);
    Plugin getById(long id);

    void add(Plugin plugin);
    void changeById(Plugin plugin, long id);

    void deleteById(long id);
}
