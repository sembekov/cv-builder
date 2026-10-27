package com.example.cvbuilder.services;

import com.example.cvbuilder.dto.request.ResumeRequest;
import com.example.cvbuilder.dto.response.ResumeResponse;
import com.example.cvbuilder.entites.Resume;
import com.example.cvbuilder.exceptions.ResumeNotFoundException;
import com.example.cvbuilder.mapper.ResumeMapper;
import com.example.cvbuilder.repositories.ResumeRepository;
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
        Resume newResume = new Resume();
        newResume.setFullName(resumeRequest.fullName());
        newResume.setDescription(resumeRequest.summary());
        newResume.setEmail(resumeRequest.email());
        newResume.setPhoneNumber(resumeRequest.phoneNumber());
        newResume.setEducation(resumeRequest.education());
        newResume.setLocation(resumeRequest.location());

        Resume savedResume = resumeRepository.save(newResume);

        return new ResumeResponse(
                savedResume.getId(),
                savedResume.getFullName(),
                savedResume.getEmail(),
                savedResume.getDescription(),
                savedResume.getPhoneNumber(),
                savedResume.getEducation(),
                savedResume.getLocation()
        );
    }

    public List<ResumeResponse> getAllResumes()  {
        return resumeRepository.findAll()
                .stream()
                .map(ResumeMapper::toResponse)
                .toList();
    }
}
