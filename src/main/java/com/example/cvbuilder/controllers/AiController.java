package com.example.cvbuilder.controllers;

import com.example.cvbuilder.dto.request.ImproveSummaryRequest;
import com.example.cvbuilder.dto.response.ImproveSummaryResponse;
import com.example.cvbuilder.services.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {
    private final AiService aiService;

    @PostMapping("/improve-summary")
    public ResponseEntity<ImproveSummaryResponse> improveSummary(@RequestBody ImproveSummaryRequest request) {
        if (request.summary() == null || request.summary().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Summary must not be empty");
        }

        return ResponseEntity.ok(aiService.improveSummary(request));
    }
}
