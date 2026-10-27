package com.example.cvbuilder.dto.response;

public record ResumeResponse(
        Long id,
        String fullName,
        String email,
        String summary,
        String phoneNumber,
        String education,
        String skills,
        String workExperience,
        String location
) {
}
