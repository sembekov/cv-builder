package com.example.cvbuilder.controllers;

import com.example.cvbuilder.dto.request.ResumeRequest;
import com.example.cvbuilder.dto.response.ResumeResponse;
import com.example.cvbuilder.services.ResumeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resumes")
public class ResumeController {
    private final ResumeService resumeService;

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse> getResumeById(@PathVariable Long id) {
        return ResponseEntity.ok(resumeService.getResumeById(id));
    }

    @GetMapping
    public ResponseEntity<List<ResumeResponse>> getAllResumes() {
        return ResponseEntity.ok(resumeService.getAllResumes());
    }

    @PostMapping
    public ResponseEntity<ResumeResponse> addResume(@RequestBody ResumeRequest resumeRequest) {
        ResumeResponse resumeResponse = resumeService.addNewResume(resumeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(resumeResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResumeResponse> updateResume(@PathVariable Long id, @Valid @RequestBody ResumeRequest resumeRequest) {
        ResumeResponse resumeResponse = resumeService.updateResume(id, resumeRequest);
        return ResponseEntity.ok(resumeResponse);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResumeResponse> patchResume(@PathVariable Long id, @RequestBody ResumeRequest resumeRequest) {
        return ResponseEntity.ok(resumeService.patchResume(id, resumeRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return ResponseEntity.noContent().build();
    }
}
