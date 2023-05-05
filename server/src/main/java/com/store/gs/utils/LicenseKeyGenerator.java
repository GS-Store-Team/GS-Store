package com.store.gs.utils;

import java.util.Random;

public class LicenseKeyGenerator {

    //Only for demonstration
    private static final Random random = new Random(42);

    public static String generate() {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < 128; i++) {
            stringBuilder.append((char) (random.nextInt((90) + 48) % 90));
        }

        return stringBuilder.toString();
    }
}
