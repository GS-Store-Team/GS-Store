package com.store.gs.models.supportclasses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

@Table("plugin_tag")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public
class TagRef {
    private Long tagId;
}