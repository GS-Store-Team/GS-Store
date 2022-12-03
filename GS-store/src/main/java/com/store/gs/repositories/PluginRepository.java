package com.store.gs.repositories;

import com.store.gs.models.Plugin;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface PluginRepository extends PagingAndSortingRepository<Plugin, Long> {
}
