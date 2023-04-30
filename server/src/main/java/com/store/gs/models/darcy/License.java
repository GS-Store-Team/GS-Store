package com.store.gs.models.darcy;

import com.store.gs.models.Plugin;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Size;
import java.util.Date;

@Data
@NoArgsConstructor
@Table("licenses")
public class License {
    @Id
    private long id;

    @MappedCollection(idColumn = "owner_id")
    private UserDarcy owner;

    @Size(max = 64)
    private String title;

    @Size(max = 64)
    private String company;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date activationDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date expireDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date supportEndDate;

    @Size(min = 1)
    private int amount;

    private String document;

    @MappedCollection(idColumn = "plugin_id")
    private Plugin plugin;

    private String pluginName;

    private String activationKey;
}
