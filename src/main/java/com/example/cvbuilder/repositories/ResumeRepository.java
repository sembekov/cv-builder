package com.example.cvbuilder.repositories;

import com.example.cvbuilder.entites.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
}
