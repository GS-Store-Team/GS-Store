package com.store.gs.dto;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class ShortProductDTO {
    @Id
    private long id;
    private String uid;
    private String name;
}
