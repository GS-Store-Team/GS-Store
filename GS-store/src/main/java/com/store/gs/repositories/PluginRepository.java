package com.store.gs.repositories;

import com.store.gs.models.Plugin;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PluginRepository extends PagingAndSortingRepository<Plugin, Long> {
}
