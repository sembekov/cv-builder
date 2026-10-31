package com.example.cvbuilder.mapper;

import com.example.cvbuilder.dto.request.WorkExperienceRequest;
import com.example.cvbuilder.entites.WorkExperience;

public class WorkExperienceMapper {
    public static WorkExperienceRequest fromEntityToRequest(WorkExperience workExperience) {
        return new WorkExperienceRequest(
                workExperience.getCompanyName(),
                workExperience.getPosition(),
                workExperience.getDescription(),
                workExperience.getStartDate(),
                workExperience.getEndDate()
        );
    }

    public static WorkExperience fromRequestToEntity(WorkExperienceRequest workExperienceRequest) {
        WorkExperience workExperience = new WorkExperience();
        workExperience.setCompanyName(workExperienceRequest.companyName());
        workExperience.setPosition(workExperienceRequest.position());
        workExperience.setDescription(workExperienceRequest.description());
        workExperience.setStartDate(workExperienceRequest.startDate());
        workExperience.setEndDate(workExperienceRequest.endDate());

        return workExperience;
    }
}
