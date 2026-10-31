package com.example.cvbuilder.dto.request;

import com.example.cvbuilder.entites.Education;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record ResumeRequest(
        @NotBlank(message = "Full name is required")
        String fullName,

        @Email(message = "Invalid email format")
        @NotBlank(message = "Email is required")
        String email,

        String summary,
        String phoneNumber,
        List<EducationRequest> education,

        @NotEmpty(message = "At least one skills is required")
        List<String> skills,

        List<WorkExperienceRequest> workExperience,
        String location
) {
}
