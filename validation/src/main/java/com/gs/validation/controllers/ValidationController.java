package com.gs.validation.controllers;

import com.gs.validation.models.VerifierObject;
import com.gs.validation.services.ValidationService;
import net.lingala.zip4j.ZipFile;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class ValidationController {
    private final ValidationService validationService;
    public ValidationController(ValidationService validationService){
        this.validationService = validationService;
    }

    @PostMapping("/validate/raw")
    public VerifierObject validate(@RequestBody byte[] rawData) throws IOException, InterruptedException {
        return innerValidate(new MockMultipartFile("file.zip", rawData));
    }

    @PostMapping("/validate")
    public VerifierObject validate(@RequestParam() MultipartFile file) throws IOException, InterruptedException {
        return innerValidate(file);
    }

    private VerifierObject innerValidate(MultipartFile file) throws IOException, InterruptedException {
        VerifierObject verifierObject = new VerifierObject();

        if (true){
            String temporaryPath = System.getProperty("user.dir")+ "/src/main/java/com/gs/validation/temporary";
            Path source = Path.of(temporaryPath + "/Example.zip");
            String target = temporaryPath +"/Example";
            if (Files.exists(Path.of(target))) {
                FileUtils.cleanDirectory(new File(target));
            }
            file.transferTo(new File(source.toUri()));
            try (ZipInputStream zis = new ZipInputStream(new FileInputStream(source.toFile()))) {
                ZipEntry zipEntry = zis.getNextEntry();

                while (zipEntry != null) {
                    if (!zipEntry.getName().contains("nuget.config")) {
                        boolean isDirectory = false;
                        if (zipEntry.getName().endsWith(File.separator)) {
                            isDirectory = true;
                        }

                        Path newPath = zipSlipProtect(zipEntry, Path.of(target));

                        if (isDirectory) {
                            Files.createDirectories(newPath);
                        } else {
                            if (newPath.getParent() != null) {
                                if (Files.notExists(newPath.getParent())) {
                                    Files.createDirectories(newPath.getParent());
                                }
                            }
                            Files.copy(zis, newPath, StandardCopyOption.REPLACE_EXISTING);
                        }
                    }
                    zipEntry = zis.getNextEntry();
                }
                zis.closeEntry();
            }

            final File folder = new File(target);
            ArrayList<File> files = new ArrayList<>();
            listFilesForFolder(folder, files);
            for (File file1 : files) {
                //System.out.println(file1.getAbsolutePath());
                MultipartFile result = new MockMultipartFile("test.dll", new FileInputStream(file1.getAbsolutePath()));
                verifierObject = validationService.validate(result);
                if (verifierObject.isPlugin){
                    return verifierObject;
                }
            }
            return verifierObject;
        }
        else{
            verifierObject.whatHappened = "Inappropriate file format: file is not zip.";
            return verifierObject;
        }
    }
    public static Path zipSlipProtect(ZipEntry zipEntry, Path targetDir)
            throws IOException {
        Path targetDirResolved = targetDir.resolve(zipEntry.getName());
        Path normalizePath = targetDirResolved.normalize();
        if (!normalizePath.startsWith(targetDir)) {
            throw new IOException("Bad zip entry: " + zipEntry.getName());
        }
        return normalizePath;
    }
    public static void listFilesForFolder(final File folder, ArrayList<File> files) throws IOException {
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry, files);
            } else {
                if (fileEntry.getName().contains(".dll")){
                    files.add(fileEntry);
                }
            }
        }
    }
}
