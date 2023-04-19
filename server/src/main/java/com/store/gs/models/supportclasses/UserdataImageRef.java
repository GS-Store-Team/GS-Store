package com.store.gs.models.supportclasses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("userdata_image")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserdataImageRef {
    @Column("image_id")
    private Long imageId;
}
