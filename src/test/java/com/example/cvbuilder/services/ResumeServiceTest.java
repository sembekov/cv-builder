package com.example.cvbuilder.services;

import com.example.cvbuilder.dto.response.ResumeResponse;
import com.example.cvbuilder.repositories.ResumeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;

@ExtendWith(MockitoExtension.class)
public class ResumeServiceTest {
    @Mock
    private ResumeRepository resumeRepository;

    @InjectMocks
    private ResumeService resumeService;

    @Test
    void getAllResumes_returnsEmptyList_whenRepositoryReturnsEmptyList() {
        when(resumeRepository.findAll(any(Sort.class)))
                .thenReturn(List.of());

        List<ResumeResponse> result = resumeService.getAllResumes();

        assertTrue(result.isEmpty());
    }
}
