package com.store.gs.models.supportclasses;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
@Data
@AllArgsConstructor
@Table("userdata_plugin")
public class BoughtPluginRef {
    @Id
    @Column("userdata_id")
    private Long userdata_id;
    @Column("plugin_id")
    private Long pluginId;
}