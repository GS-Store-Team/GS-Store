package com.store.gs.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Getter @Setter
@Table("image")
public class Image {
    @Id
    private long id;
    @Column("is_preview")
    private boolean isPreview;
    private byte[] data;

    public Image(byte[] data, boolean isPreview) {
        this.data = data;
        this.isPreview = isPreview;
    }
}
