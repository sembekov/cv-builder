package com.example.cvbuilder.dto.request;

public record ResumeRequest(
        String fullName,
        String email,
        String summary,
        String phoneNumber,
        String education,
        String location
) {
}
