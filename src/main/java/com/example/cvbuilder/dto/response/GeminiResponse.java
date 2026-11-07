package com.example.cvbuilder.dto.response;

import java.util.List;

public record GeminiResponse(
        List<Step> steps

) {
    public record Step(
            String type,
            List<Content> content
    ) {
    }

    public record Content(
            String type,
            String text
    ) {}
}
