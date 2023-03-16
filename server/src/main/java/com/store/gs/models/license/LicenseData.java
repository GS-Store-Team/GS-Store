package com.store.gs.models.license;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@Table("license")
public class LicenseData {
    @Id
    private long id;
    @Size(max = 64)
    private String title;
    @Column("plugin_id")
    private long pluginId;
    @Column("owner_id")
    private long ownerId;
    @Size(max = 64)
    private String company;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private Date activationDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private Date expireDate;
    @Size(min = 1)
    private List<LicenseGrant> licenseGrants;
}
