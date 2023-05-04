package com.store.gs.repositories;

import com.store.gs.models.Image;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends CrudRepository<Image, Long> {

    @Modifying
    @Query("update image set is_preview = true where id = :id")
    void setPreviewById(@Param("id") long id);

    @Modifying
    @Query("update image set is_preview = false where id = :id")
    void UnsetPreviewById(@Param("id") long pluginId);

    @Query("select * from image where id in (:ids) and is_preview = true LIMIT 1;")
    Optional<Image> getPreviewByIds(@Param("ids") List<Long> ids);
}
