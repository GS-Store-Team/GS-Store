package com.store.gs.utils;

import java.util.concurrent.ThreadLocalRandom;

public class ModelsUtils {
    public static String generateUserName(){
        return "User_" + ThreadLocalRandom.current().nextInt(0,1000000);
    }
}
