package com.example.cvbuilder.dto.response;

import com.example.cvbuilder.dto.request.EducationRequest;
import com.example.cvbuilder.dto.request.WorkExperienceRequest;

import java.util.List;

public record ResumeResponse(
        Long id,
        String fullName,
        String email,
        String summary,
        String phoneNumber,
        List<EducationRequest> education,
        List<String> skills,
        List<WorkExperienceRequest> workExperience,
        String location
) {
}
