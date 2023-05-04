package com.store.gs.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
public class VerifierDTO {
    public boolean isPlugin;
    public boolean isTypesAvailable;
    public ArrayList<String> types;
    public ArrayList<String> mistakes;
}