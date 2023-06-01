package com.store.gs.repositories;

import com.store.gs.models.PluginFile;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PluginFileRepository extends CrudRepository<PluginFile, Long> {
    @Modifying
    @Query("insert into plugin_file (plugin_id, data) " +
            "values (:plugin_id, :data)")
    void insert(@Param("plugin_id") Long pluginId,
                @Param("data") byte[] data);

    @Modifying
    @Query("delete from plugin_file where plugin_id = :plugin_id" )
    void deleteById(@Param("plugin_id") Long pluginId);

    @Query("select * from plugin_file where plugin_id = :plugin_id" )
    Optional<PluginFile> manualFindById(@Param("plugin_id") Long pluginId);
}
