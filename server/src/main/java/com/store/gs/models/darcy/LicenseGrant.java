package com.store.gs.models.darcy;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Date;

@Data
@NoArgsConstructor
@Table("grants")
public class LicenseGrant {
    private long id;
    private Date activationDate;
    private Date expireDate;
    private int amount;
    private boolean isActivated;
    private Date supportEndDate;
    private String document;

    private long moduleId;
    private String moduleName;
}
