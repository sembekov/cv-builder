package com.example.cvbuilder.dto.request;

import java.time.LocalDate;

public record WorkExperienceRequest(
        String companyName,
        String position,
        String description,
        LocalDate startDate,
        LocalDate endDate
) {
}
