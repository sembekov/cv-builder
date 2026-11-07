package com.example.cvbuilder.services;

import com.example.cvbuilder.AiClient.GeminiApiClient;
import com.example.cvbuilder.dto.request.ImproveSummaryRequest;
import com.example.cvbuilder.dto.response.ImproveSummaryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class AiService {
    private final GeminiApiClient client;

    public ImproveSummaryResponse improveSummary(ImproveSummaryRequest request) {
        String prompt = """
                Improve the following resume summary for a student or early-career job seeker.
                
                Requirements:
                - Make it professional, clear, and concise.
                - Preserve the original meaning.
                - Do not invent experience, skills, achievements, or qualifications.
                - Return only the improved summary, without quotation marks or explanations.
                Summary:
                %s
                """.formatted(request.summary());
        String improvedSummary = client.improveSummary(prompt);
        return new ImproveSummaryResponse(improvedSummary.trim());
    }
}

