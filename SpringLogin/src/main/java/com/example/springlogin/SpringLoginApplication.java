package com.example.springlogin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;



@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class SpringLoginApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringLoginApplication.class, args);
    }

}
