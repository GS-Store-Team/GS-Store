package com.store.gs.dto;

import lombok.Data;

@Data
public class LicenseRequestDTO {
    private long id;
    private String title;
    private String comment;
    private String user;
    private String company;
    private String server;
    private String deviceId;
}
