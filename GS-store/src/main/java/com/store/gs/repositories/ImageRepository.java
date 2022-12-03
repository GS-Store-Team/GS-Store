package com.store.gs.repositories;

import com.store.gs.models.MyImage;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends CrudRepository<MyImage, Long> {
    @Modifying
    @Query("update image set is_preview = true where id = :id")
    void setPreviewById(@Param("id") long id);

    @Modifying
    @Query("update image set is_preview = false where plugin_id = :id")
    void UnSetPreviewById(@Param("id") long pluginId);

    @Query("select id from image where plugin_Id = :id;")
    List<Long> getImagesIdByPluginId(@Param("id") long pluginId);

    @Query("select * from image where plugin_Id = :id and is_preview = true;")
    Optional<MyImage> getPreviewByPluginId(@Param("id") long pluginId);
}
