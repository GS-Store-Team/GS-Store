package com.store.gs.models;

import lombok.*;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("plugin_file")
public class PluginFile {
    @Id
    @Column("plugin_id")
    private Long id;
    private byte[] data;
}
