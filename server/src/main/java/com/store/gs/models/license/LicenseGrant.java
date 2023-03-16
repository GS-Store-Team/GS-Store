package com.store.gs.models.license;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class LicenseGrant {
    private long id;
    private Date activationDate;
    private Date expireDate;
    private int amount;
    private boolean isActivated;
    private Date supportEndDate;
    private String document;
}
