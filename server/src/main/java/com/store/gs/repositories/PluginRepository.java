package com.store.gs.repositories;

import com.infobip.spring.data.jdbc.QuerydslJdbcRepository;
import com.store.gs.models.Plugin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PluginRepository extends QuerydslJdbcRepository<Plugin, Long> {

    Page<Plugin> findAllByIdIn(List<Long> ids, Pageable pageable);
}
