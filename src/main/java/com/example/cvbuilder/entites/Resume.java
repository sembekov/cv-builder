package com.example.cvbuilder.entites;

import com.example.cvbuilder.dto.request.EducationRequest;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String description;
    private String phoneNumber;

    @OneToMany(mappedBy = "resume")
    private List<Education> education = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "resume_skills",
            joinColumns = @JoinColumn(name = "resume_id")
    )
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();

    @OneToMany(mappedBy = "resume")
    private List<WorkExperience> workExperience = new ArrayList<>();
    private String location;
}
