package com.store.gs.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@NoArgsConstructor
@Getter
@Setter

@Table("tag")
public class Tag {
    @Id
    private long id;
    private String title;
}
