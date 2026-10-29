package com.example.cvbuilder.mapper;

import com.example.cvbuilder.dto.request.ResumeRequest;
import com.example.cvbuilder.dto.response.ResumeResponse;
import com.example.cvbuilder.entites.Resume;
import org.springframework.stereotype.Component;

public class ResumeMapper {
    public static ResumeResponse toResponse(Resume resume) {
        ResumeResponse resumeResponse = new ResumeResponse(resume.getId(), resume.getFullName(), resume.getEmail(), resume.getDescription(), resume.getPhoneNumber(), resume.getEducation(), resume.getSkills(), resume.getWorkExperience(), resume.getLocation());
        return resumeResponse;
    }

    public static Resume toEntityFromRequest(ResumeRequest resumeRequest) {
        Resume newResume = new Resume();
        newResume.setFullName(resumeRequest.fullName());
        newResume.setEmail(resumeRequest.email());
        newResume.setDescription(resumeRequest.summary());
        newResume.setPhoneNumber(resumeRequest.phoneNumber());
        newResume.setEducation(resumeRequest.education());
        newResume.setSkills(resumeRequest.skills());
        newResume.setWorkExperience(resumeRequest.workExperience());
        newResume.setLocation(resumeRequest.location());

        return newResume;
    }

    public static Resume toEntityFromRequest(ResumeRequest resumeRequest, String finalSummary) {
        return Resume.builder()
                .fullName(resumeRequest.fullName())
                .email(resumeRequest.email())
                .description(resumeRequest.summary())
                .phoneNumber(resumeRequest.phoneNumber())
                .education(resumeRequest.education())
                .skills(resumeRequest.skills())
                .workExperience(resumeRequest.workExperience())
                .location(resumeRequest.location())
                .build();
    }
}
