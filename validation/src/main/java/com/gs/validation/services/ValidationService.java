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
        String absolutePath = System.getProperty("user.dir")+ "/src/main/java/com/gs/validation/temporary";
        file.transferTo(new File(absolutePath + "/validate.dll"));
        Process proc = Runtime.getRuntime().exec("mcs /target:exe /out:" +absolutePath + "/Program.exe "+ absolutePath + "/Program.cs");
        //Process proc = Runtime.getRuntime().exec("csc /target:exe /out:" +absolutePath + "/Program.exe "+ absolutePath + "/Program.cs");
        BufferedReader stdError = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
        BufferedReader stdOut = new BufferedReader(new InputStreamReader(proc.getInputStream()));
        String error;
        while ((error = stdError.readLine()) != null){
            System.out.println(error);
        }

        String line;
        while ((line = stdOut.readLine()) != null){
            System.out.println(line);
        }
        stdOut.close();
        stdError.close();
        proc.waitFor();
        Process proc1 = Runtime.getRuntime().exec("mono " + absolutePath+ "/Program.exe " + absolutePath + "/validate.dll ");

        BufferedReader stdError1 = new BufferedReader(new InputStreamReader(proc1.getErrorStream()));

        String error1;
        while ((error1 = stdError1.readLine()) != null){
            if (error1.contains("Unhandled Exception")){
                verifierObject.whatHappened = "Compiler version is not comparable.";
                return verifierObject;
            }
        }

        BufferedReader stdInput1 = new BufferedReader(new InputStreamReader(proc1.getInputStream()));
        String s;
        verifierObject.isPlugin = stdInput1.readLine().equals("Is plugin");
        verifierObject.isTypesAvailable = stdInput1.readLine().equals("good");
        verifierObject.types = new ArrayList<>();
        verifierObject.mistakes = new ArrayList<>();
        while (!(s = stdInput1.readLine()).equals("Errors:")){
            verifierObject.types.add(s);
        }
        while ((s = stdInput1.readLine()) != null){
            verifierObject.mistakes.add(s);
        }
        stdInput1.close();

        return verifierObject;
    }
}
