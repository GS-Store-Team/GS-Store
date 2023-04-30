package com.store.gs.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@NoArgsConstructor
@Getter
@Setter
@Table("image")
public class MyImage {
    @Id
    private long id;
    @Column("plugin_id")
    private long pluginId;
    @Column("is_preview")
    private boolean isPreview;

    private byte[] data;
}
