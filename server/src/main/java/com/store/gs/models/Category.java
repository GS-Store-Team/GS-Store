package com.store.gs.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("category")
public class Category {
    @Id
    private long id;
    private String title;
}
