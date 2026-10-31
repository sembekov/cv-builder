package com.example.cvbuilder.services;

import com.example.cvbuilder.dto.request.ResumeRequest;
import com.example.cvbuilder.dto.response.ResumeResponse;
import com.example.cvbuilder.entites.Resume;
import com.example.cvbuilder.exceptions.ResumeNotFoundException;
import com.example.cvbuilder.mapper.ResumeMapper;
import com.example.cvbuilder.repositories.ResumeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.cvbuilder.mapper.ResumeMapper.*;

@Service
@RequiredArgsConstructor
public class ResumeService {
    private final ResumeRepository resumeRepository;

    public ResumeResponse getResumeById(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResumeNotFoundException("Resume not found"));

        ResumeResponse response = toResponse(resume);
        return response;
    }

    public ResumeResponse addNewResume(ResumeRequest resumeRequest) {
        String finalSummary = resumeRequest.summary();

        if (finalSummary == null || finalSummary.isEmpty()) {
            // AI function
        }

        Resume newResume = ResumeMapper.toEntity(resumeRequest, finalSummary);
        Resume savedResume = resumeRepository.save(newResume);
        return ResumeMapper.toResponse(savedResume);
    }

    public List<ResumeResponse> getAllResumes()  {
        return resumeRepository.findAll()
                .stream()
                .map(ResumeMapper::toResponse)
                .toList();
    }

    @Transactional
    public ResumeResponse updateResume(Long id, ResumeRequest resumeRequest) {
        Resume existingResume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResumeNotFoundException("Resume not found with id: " + id));

        existingResume.setFullName(resumeRequest.fullName());
        existingResume.setEmail(resumeRequest.email());
        existingResume.setPhoneNumber(resumeRequest.phoneNumber());
        existingResume.setLocation(resumeRequest.location());
        existingResume.setSkills(resumeRequest.skills());
        existingResume.setWorkExperience(resumeRequest.workExperience());
        existingResume.setEducation(resumeRequest.education());

        if (resumeRequest.summary() != null && !resumeRequest.summary().isBlank()) {
            existingResume.setDescription(resumeRequest.summary());
        }

        return ResumeMapper.toResponse(existingResume);
    }

    @Transactional
    public ResumeResponse patchResume(Long id, ResumeRequest resumeRequest) {
        Resume existingResume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResumeNotFoundException("Resume not found with id: " + id));

        if (resumeRequest.fullName() != null) {
            existingResume.setFullName(resumeRequest.fullName());
        }
        if (resumeRequest.email() != null) {
            existingResume.setEmail(resumeRequest.email());
        }
        if (resumeRequest.summary() != null) {
            existingResume.setDescription(resumeRequest.summary());
        }
        if (resumeRequest.education() != null) {
            existingResume.setEducation(resumeRequest.education());
        }
        if (resumeRequest.phoneNumber() != null) {
            existingResume.setPhoneNumber(resumeRequest.phoneNumber());
        }
        if (resumeRequest.workExperience() != null) {
            existingResume.setWorkExperience(resumeRequest.workExperience());
        }
        if (resumeRequest.skills() != null) {
            existingResume.setSkills(resumeRequest.skills());
        }
        if (resumeRequest.location() != null) {
            existingResume.setLocation(resumeRequest.location());
        }

        return ResumeMapper.toResponse(existingResume);
    }

    public void deleteResume(Long id) {
        if (!resumeRepository.existsById(id)) {
            throw new ResumeNotFoundException("Resume not found: " + id);
        }

        resumeRepository.deleteById(id);
    }
}
