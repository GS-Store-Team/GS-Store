package com.store.gs.models.supportclasses;

import com.store.gs.models.Tag;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("plugin_tag")
public
class TagRef {
    @Id
    @Column("tag_id")
    private Long tagId;
    @Column("plugin_id")
    private Long pluginId;
}