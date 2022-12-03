package com.store.gs.controllers.advicies;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.NoSuchElementException;

@ControllerAdvice
public class ImageControllerAdvice {
    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<?> wrongFileExceptionHandler(){
        return ResponseEntity.status(-1).build();
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> noContent(){
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(SizeLimitExceededException.class)
    public ResponseEntity<?> tooLargeFile(){
        return ResponseEntity.status(-2).build();
    }
}
