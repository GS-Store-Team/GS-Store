package com.store.gs.repositories;

import com.store.gs.models.Plugin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PluginRepository extends PagingAndSortingRepository<Plugin, Long> {
    Page<Plugin> getByDeveloperEmail(String email, Pageable pageable);
}
