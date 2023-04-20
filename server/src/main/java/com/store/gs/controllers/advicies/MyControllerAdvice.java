package com.store.gs.controllers.advicies;

import com.store.gs.Exceptions.GSException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.NoSuchElementException;

@ControllerAdvice
@Slf4j
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

    @ExceptionHandler(GSException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void processRuntimeException(GSException e) {
        log.error(e.toString());
    }

    @ExceptionHandler(RuntimeException.class)
    public void processRuntimeException(RuntimeException e) {
        throw new RuntimeException(e);
    }

    @ExceptionHandler(UserPrincipalNotFoundException.class)
    public ResponseEntity<?> userPrincipalNotFound() {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(JwtException.class)
    @ResponseStatus(HttpStatus.LOCKED)
    public void expiredOrWrongJWT(JwtException e) {
        log.warn(e.getMessage());
    }
}