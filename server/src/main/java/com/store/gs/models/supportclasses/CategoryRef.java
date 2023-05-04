package com.store.gs.models.supportclasses;

import com.store.gs.models.Category;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("plugin_category")
public class CategoryRef {
    @Id
    @Column("category_id")
    private Long categoryId;
    @Column("plugin_id")
    private Long pluginId;
}