package com.store.gs.models.supportclasses;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("plugin_image")
public class PluginImageRef {
    @Id
    @Column("image_id")
    private Long imageId;
    @Column("plugin_id")
    private Long pluginId;
}
