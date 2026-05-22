package com.example.back_end.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("filename") String filename) {
        try {
            Path savePath = Paths.get("D:/Motorcycle-Dealer/front_end/src/assets/bikes/" + filename);
            Files.createDirectories(savePath.getParent());
            file.transferTo(savePath);
            return ResponseEntity.ok("Salvat: " + filename);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Eroare: " + e.getMessage());
        }
    }
}
