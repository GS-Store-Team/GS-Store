package com.store.gs.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Size;

@Setter @Getter
@ToString
@Table("plugins")
public class Plugin {
    @Id
    private long id;
    @Size(min = 4, max = 64, message = "\"Name\" length should be in range [4 - 64] characters!")
    private String name;
    @Size(min = 20, max = 512, message = "\"Short description\" length should be in range [20 - 512] characters!")
    @Column("shortdescription")
    private String shortDescription;
    @Size(min = 20, max = 8192, message = "\"Full description\" length should be in range [20 - 8192] characters!")
    @Column("fulldescription")
    private String fullDescription;
    //private List<String> pictures;
    @DecimalMin(value = "0.0", message = "\"Mark\" should be valid and be of type double!")
    private double mark;
    //private List<Long> revives;
    @DecimalMin(value = "0.0", message = "\"Price\" should be valid!")
    private double price;
    //private List<Category> categories;
    //private List<String> hashtags;
    @Column("isdeleted")
    private boolean isDeleted;
    public Plugin() {}
}
