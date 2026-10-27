package com.example.cvbuilder.mapper;

import com.example.cvbuilder.dto.request.ResumeRequest;
import com.example.cvbuilder.dto.response.ResumeResponse;
import com.example.cvbuilder.entites.Resume;
import org.springframework.stereotype.Component;

public class ResumeMapper {
    public static ResumeResponse toResponse(Resume resume) {
        ResumeResponse resumeResponse = new ResumeResponse(resume.getId(), resume.getFullName(), resume.getEmail(), resume.getDescription(), resume.getPhoneNumber(), resume.getEducation(), resume.getLocation());
        return resumeResponse;
    }
}
