package com.example.cvbuilder.dto.request;

import java.time.LocalDate;

public record EducationRequest(
        String institution,
        String degree,
        String fieldOfStudy,
        LocalDate startDate,
        LocalDate endDate
) {
}
