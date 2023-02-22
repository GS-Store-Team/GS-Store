package com.store.gs.models;

import com.store.gs.models.supportclasses.CategoryRef;
import com.store.gs.models.supportclasses.TagRef;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Setter @Getter
@ToString
@Table("plugin")
@NoArgsConstructor
public class Plugin {
    @Id
    private long id;
    private String developer;
    @Size(min = 4, max = 64, message = "Name length should be in range [4 - 64] characters!")
    private String name;
    @Size(min = 20, max = 512, message = "Short description length should be in range [20 - 512] characters!")
    @Column("shortdescription")
    private String shortDescription;
    @Size(min = 20, max = 8192, message = "Full description length should be in range [20 - 8192] characters!")
    @Column("fulldescription")
    private String fullDescription;
    //private List<String> pictures;
    @DecimalMin(value = "0.0", message = "Mark should be valid and be of type double!")
    private double mark;
    @DecimalMin(value = "0.0", message = "Price should be valid!")
    private double price;

    @MappedCollection(idColumn = "plugin_id")
    private Set<CategoryRef> categories = new HashSet<>();

    @MappedCollection(idColumn = "plugin_id")
    private Set<TagRef> hashtags = new HashSet<>();

    @Column("isdeleted")
    private boolean isDeleted;
}