package com.example.cvbuilder.mapper;

import com.example.cvbuilder.dto.request.EducationRequest;
import com.example.cvbuilder.dto.request.ResumeRequest;
import com.example.cvbuilder.dto.request.WorkExperienceRequest;
import com.example.cvbuilder.dto.response.ResumeResponse;
import com.example.cvbuilder.entites.Education;
import com.example.cvbuilder.entites.Resume;
import com.example.cvbuilder.entites.WorkExperience;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ResumeMapper {
    public static ResumeResponse toResponse(Resume resume) {
        List<EducationRequest> educationRequests = resume.getEducation().stream()
                .map(EducationMapper::toRequestFromEntity)
                .toList();

        List<WorkExperienceRequest> workExperience = resume.getWorkExperience().stream()
                .map(WorkExperienceMapper::fromEntityToRequest)
                .toList();

        return new ResumeResponse(
                resume.getId(),
                resume.getFullName(),
                resume.getEmail(),
                resume.getDescription(),
                resume.getPhoneNumber(),
                educationRequests,
                resume.getSkills(),
                workExperience,
                resume.getLocation()
        );
    }

    public static Resume toEntity(ResumeRequest resumeRequest) {
        return toEntity(resumeRequest, resumeRequest.summary());
    }

    public static Resume toEntity(ResumeRequest resumeRequest, String finalSummary) {
        Resume newResume = new Resume();
        newResume.setFullName(resumeRequest.fullName());
        newResume.setEmail(resumeRequest.email());
        newResume.setDescription(finalSummary);
        newResume.setPhoneNumber(resumeRequest.phoneNumber());

        List<Education> education = resumeRequest.education() == null
                ? new ArrayList<>()
                : resumeRequest.education().stream()
                .map(EducationMapper::toEntityFromRequest)
                .toList();
        education.forEach(item -> item.setResume(newResume));
        newResume.setEducation(new ArrayList<>(education));

        List<WorkExperience> workExperiences = resumeRequest.workExperience() == null
                ? new ArrayList<>()
                : resumeRequest.workExperience().stream()
                .map(WorkExperienceMapper::fromRequestToEntity)
                .toList();
        workExperiences.forEach(item -> item.setResume(newResume));
        newResume.setWorkExperience(workExperiences);

        newResume.setSkills(
                resumeRequest.skills() != null
                        ? new ArrayList<>(resumeRequest.skills())
                        : new ArrayList<>()
        );
        newResume.setLocation(resumeRequest.location());

        return newResume;
    }
}
