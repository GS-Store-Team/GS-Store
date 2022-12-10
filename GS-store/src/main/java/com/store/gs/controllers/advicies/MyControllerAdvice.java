package com.store.gs.controllers.advicies;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.ServletException;
import java.util.NoSuchElementException;

@ControllerAdvice
public class MyControllerAdvice {
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

    @ExceptionHandler(ServletException.class)
    public ResponseEntity<?> invalidJWTToken() {
        return new ResponseEntity<>(HttpStatus.LOCKED);
    }

//    @ExceptionHandler(RuntimeException.class)
//    public ResponseEntity<?> processRuntimeException(RuntimeException e) {
//        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
//    }
}