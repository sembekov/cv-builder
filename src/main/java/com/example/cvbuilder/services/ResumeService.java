package com.example.cvbuilder.services;

import com.example.cvbuilder.dto.request.ResumeRequest;
import com.example.cvbuilder.dto.response.ResumeResponse;
import com.example.cvbuilder.entites.Education;
import com.example.cvbuilder.entites.Resume;
import com.example.cvbuilder.entites.WorkExperience;
import com.example.cvbuilder.entites.enums.ResumeTemplate;
import com.example.cvbuilder.exceptions.ResumeNotFoundException;
import com.example.cvbuilder.mapper.EducationMapper;
import com.example.cvbuilder.mapper.ResumeMapper;
import com.example.cvbuilder.mapper.WorkExperienceMapper;
import com.example.cvbuilder.repositories.ResumeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {
    private final ResumeRepository resumeRepository;

    public ResumeResponse getResumeById(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResumeNotFoundException("Resume not found"));

        return ResumeMapper.toResponse(resume);
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
        Sort sort = Sort.by(
                Sort.Order.desc("updatedAt").nullsLast(),
                Sort.Order.desc("id")
        );

        return resumeRepository.findAll(sort)
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
        existingResume.setDescription(resumeRequest.summary());
        existingResume.setPhoneNumber(resumeRequest.phoneNumber());
        existingResume.setLocation(resumeRequest.location());
        existingResume.setSkills(new ArrayList<>(resumeRequest.skills()));

        existingResume.getEducation().clear();

        if (resumeRequest.education() != null) {
            List<Education> educations = resumeRequest.education().stream()
                    .map(EducationMapper::toEntityFromRequest)
                    .toList();

            educations.forEach(education -> education.setResume(existingResume));
            existingResume.getEducation().addAll(educations);
        }

        existingResume.getWorkExperience().clear();

        if (resumeRequest.workExperience() != null) {
            List<WorkExperience> workExperiences = resumeRequest.workExperience().stream()
                    .map(WorkExperienceMapper::fromRequestToEntity)
                    .toList();
            workExperiences.forEach(workExperience -> workExperience.setResume(existingResume));
            existingResume.getWorkExperience().addAll(workExperiences);
        }
        existingResume.setResumeTemplate(
                resumeRequest.resumeTemplate() != null
                        ? resumeRequest.resumeTemplate()
                        : ResumeTemplate.MODERN
        );

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
            List<Education> educations = resumeRequest.education().stream()
                    .map(EducationMapper::toEntityFromRequest)
                    .toList();
            educations.forEach(item -> item.setResume(existingResume));
            existingResume.setEducation(new ArrayList<>(educations));
        }
        if (resumeRequest.phoneNumber() != null) {
            existingResume.setPhoneNumber(resumeRequest.phoneNumber());
        }
        if (resumeRequest.workExperience() != null) {
            List<WorkExperience> workExperiences = resumeRequest.workExperience().stream()
                    .map(WorkExperienceMapper::fromRequestToEntity)
                    .toList();
            workExperiences.forEach(item -> item.setResume(existingResume));
            existingResume.setWorkExperience(new ArrayList<>(workExperiences));
        }
        if (resumeRequest.skills() != null) {
            existingResume.setSkills(resumeRequest.skills());
        }
        if (resumeRequest.location() != null) {
            existingResume.setLocation(resumeRequest.location());
        }
        if (resumeRequest.resumeTemplate() != null) {
            existingResume.setResumeTemplate(resumeRequest.resumeTemplate());
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
