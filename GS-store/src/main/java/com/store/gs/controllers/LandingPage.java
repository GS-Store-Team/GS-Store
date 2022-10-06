package com.store.gs.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LandingPage {
    @GetMapping()
    public String helloWorld(){
        return "hello";
    }
}

