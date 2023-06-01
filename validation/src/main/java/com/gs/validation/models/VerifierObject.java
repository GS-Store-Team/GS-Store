package com.gs.validation.models;

import java.util.ArrayList;

public class VerifierObject {
    public boolean isPlugin = false;
    public String whatHappened = "File successfully passed validation. No issues found.";
    public boolean isTypesAvailable = false;
    public ArrayList<String> types = new ArrayList<>();
    public ArrayList<String> mistakes = new ArrayList<>();

    @Override
    public String toString() {
        return "\nwhat happened:" + whatHappened + "; \nis plugin:" + isPlugin + ";  " + "\nisTypesAvailable: " + isTypesAvailable + "; " + "\ntypes: " + types.toString() +
                "; " + "\nmistakes: " + mistakes +"\n\n\n";
    }
}

