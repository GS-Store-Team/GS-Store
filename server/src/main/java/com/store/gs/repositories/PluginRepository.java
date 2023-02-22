package com.store.gs.repositories;

import com.store.gs.models.Plugin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PluginRepository extends PagingAndSortingRepository<Plugin, Long> {
    Page<Plugin> findAllByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("select * from plugin, plugin_category " +
            "where plugin.id = plugin_category.plugin_id " +
            "and plugin_category.category_id = :categoryId " +
            "limit :limit " +
            "offset :offset")
    List<Plugin> findAllByCategoryId(@Param("categoryId") long categoryId,
                                     @Param("limit") long limit,
                                     @Param("offset") long offset);

    @Query("select count(*) from plugin, plugin_category " +
            "where plugin.id = plugin_category.plugin_id " +
            "and plugin_category.category_id = :categoryId")
    int findCountOfAllByCategoryId(@Param("categoryId") long categoryId);


    @Query("select * from plugin, plugin_category " +
            "where plugin.id = plugin_category.plugin_id " +
            "and plugin_category.category_id = :categoryId " +
            "and LOWER(plugin.name) ~ LOWER(:filter) " +
            "limit :limit " +
            "offset :offset")
    List<Plugin> findAllByCategoryIdAndFilter(@Param("filter") String filter,
                                              @Param("categoryId") long categoryId,
                                              @Param("limit") long limit,
                                              @Param("offset") long offset);

    @Query("select count(*) from plugin, plugin_category " +
            "where plugin.id = plugin_category.plugin_id " +
            "and plugin_category.category_id = :categoryId " +
            "and LOWER(plugin.name) ~ LOWER(:filter)")
    int findCountOfAllByCategoryIdAndFilter(@Param("filter") String filter,
                                            @Param("categoryId") long categoryId);
}
