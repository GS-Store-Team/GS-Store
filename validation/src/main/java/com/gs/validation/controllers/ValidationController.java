package com.gs.validation.controllers;

import com.gs.validation.models.VerifierObject;
import com.gs.validation.services.ValidationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class ValidationController {
    private final ValidationService validationService;
    public ValidationController(ValidationService validationService){
        this.validationService = validationService;
    }
    @PostMapping("/validate")
    public VerifierObject validate(@RequestParam() MultipartFile file) throws IOException, InterruptedException {
        return validationService.validate(file);
    }

}
