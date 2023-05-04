package com.store.gs.models.supportclasses;

import com.store.gs.models.Image;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("userdata_image")
public class UserdataImageRef {
    @Id
    @Column("image_id")
    private Long imageId;
    @Column("userdata_id")
    private Long userId;
}
