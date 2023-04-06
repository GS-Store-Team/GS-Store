package com.store.gs.models.darcy;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Size;
import java.util.Date;

@Data
@NoArgsConstructor
@Table("grants")
public class LicenseModule {
    @Id
    private long id;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date activationDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date expireDate;
    @Size(min = 1)
    private int amount;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date supportEndDate;
    private String document;

    @Column("module_id")
    private long moduleId;
    private String moduleName;
}
