package com.example.cvbuilder.mapper;

import com.example.cvbuilder.dto.request.EducationRequest;
import com.example.cvbuilder.entites.Education;

public class EducationMapper {
    public static Education toEntityFromRequest(EducationRequest educationRequest) {
        Education education = new Education();
        education.setInstitution(educationRequest.institution());
        education.setFieldOfStudy(educationRequest.fieldOfStudy());
        education.setDegree(educationRequest.degree());
        education.setStartDate(educationRequest.startDate());
        education.setEndDate(educationRequest.endDate());

        return education;
    }

    public static EducationRequest toRequestFromEntity(Education education) {
        return new EducationRequest(
                education.getInstitution(),
                education.getDegree(),
                education.getFieldOfStudy(),
                education.getStartDate(),
                education.getEndDate()
        );
    }
}
