package com.store.gs.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class VerifierDTO {
    public boolean isPlugin;
    public boolean isTypesAvailable;
    public ArrayList<String> types;
    public ArrayList<String> mistakes;
}