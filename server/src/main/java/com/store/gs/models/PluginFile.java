package com.store.gs.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.relational.core.mapping.Table;

@NoArgsConstructor
@Setter @Getter
@Table("plugin_file")
public class PluginFile {
    @Id
    private long id;
    private byte[] data;
}
