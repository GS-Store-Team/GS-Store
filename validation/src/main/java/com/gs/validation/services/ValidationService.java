package com.gs.validation.services;

import com.gs.validation.models.VerifierObject;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.ArrayList;

@Service
public class ValidationService {
    public VerifierObject validate(MultipartFile file) throws IOException, InterruptedException {
        VerifierObject verifierObject = new VerifierObject();
        System.out.println(System.getProperty("user.dir"));
        String absolutePath = System.getProperty("user.dir")+ "/validation/src/main/java/com/gs/validation/temporary";
        file.transferTo(new File(absolutePath + "/validate.dll"));
        Process proc = Runtime.getRuntime().exec("csc /target:exe /out:" +absolutePath + "/Program.exe "+ absolutePath + "/Program.cs");
        proc.waitFor();
        Process proc1 = Runtime.getRuntime().exec("mono " + absolutePath+ "/Program.exe " + absolutePath + "/validate.dll ");
        BufferedReader stdError = new BufferedReader(new InputStreamReader(proc1.getErrorStream()));
        String error;
        while ((error = stdError.readLine()) != null){
            System.out.println(error);
        }
        stdError.close();
        BufferedReader stdInput = new BufferedReader(new InputStreamReader(proc1.getInputStream()));
        String s;
        verifierObject.isPlugin = stdInput.readLine().equals("Is plugin");
        verifierObject.isTypesAvailable = stdInput.readLine().equals("good");
        verifierObject.types = new ArrayList<>();
        verifierObject.mistakes = new ArrayList<>();
        while (!(s = stdInput.readLine()).equals("Errors:")){
            verifierObject.types.add(s);
        }
        while ((s = stdInput.readLine()) != null){
            verifierObject.mistakes.add(s);
        }
        stdInput.close();
        FileUtils.cleanDirectory(new File(absolutePath));
        return verifierObject;
    }
}
