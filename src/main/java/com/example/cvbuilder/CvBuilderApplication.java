package com.example.cvbuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CvBuilderApplication {

    public static void main(String[] args) {
        SpringApplication.run(CvBuilderApplication.class, args);
    }

}
