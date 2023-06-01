package com.store.gs.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("image")
public class Image {
    @Id
    private long id;
    @Column("is_preview")
    private boolean isPreview;
    private byte[] data;
    private String name;

    public Image(byte[] data, boolean isPreview, String name) {
        this.data = data;
        this.isPreview = isPreview;
        this.name = name;
    }
}
