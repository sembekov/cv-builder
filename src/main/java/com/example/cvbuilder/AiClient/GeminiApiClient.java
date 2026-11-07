package com.example.cvbuilder.AiClient;

import com.example.cvbuilder.dto.request.GeminiRequest;
import com.example.cvbuilder.dto.response.GeminiResponse;
import lombok.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GeminiApiClient {
    private final RestClient restClient;
    private final String apiKey;

    public GeminiApiClient(RestClient.Builder builder) {
        this.restClient = builder.baseUrl("https://generativelanguage.googleapis.com").build();
        this.apiKey = "your_api_key_is_here";
    }

    public String improveSummary(String prompt) {
        GeminiRequest request = new GeminiRequest("gemini-3.5-flash-lite", prompt);
        GeminiResponse response = restClient.post()
                .uri("/v1beta/interactions")
                .header("x-goog-api-key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(GeminiResponse.class);

        if (response == null || response.steps() == null) {
            throw new IllegalArgumentException("Empty response from Gemini");
        }

        return response.steps().stream()
                .filter(step -> "model_output".equals(step.type()))
                .flatMap(step -> step.content().stream())
                .filter(content -> "text".equals(content.type()))
                .map(GeminiResponse.Content::text)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Gemini returned no text"));
    }
}
