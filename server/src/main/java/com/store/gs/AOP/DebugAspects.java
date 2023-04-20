package com.store.gs.AOP;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
//@Component
@Aspect
public class DebugAspects {
    @SneakyThrows
    @Around("execution(* *(..)) && within(com.store.gs.controllers.*)")
    public Object handleAPICalls(ProceedingJoinPoint pjp){

        Method method = ((MethodSignature) pjp.getSignature()).getMethod();

        log.info(method.getDeclaringClass().getSimpleName().toUpperCase() + " " + method.getName().toUpperCase());

        return pjp.proceed();
    }
}
