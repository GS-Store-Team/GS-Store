package com.store.gs.repositories;

import com.store.gs.models.Plugin;
import com.store.gs.models.PluginLight;
import java.util.List;

public interface PluginRepository {
    List<PluginLight> getListByPage(long pageNum);
    Plugin getById(long id);

    void create(Plugin plugin);
    void updateById(Plugin plugin, long id);

    void deleteById(long id);
}
