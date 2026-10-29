package com.example.cvbuilder.dto.response;

import java.util.List;

public record ResumeResponse(
        Long id,
        String fullName,
        String email,
        String summary,
        String phoneNumber,
        String education,
        List<String> skills,
        String workExperience,
        String location
) {
}
