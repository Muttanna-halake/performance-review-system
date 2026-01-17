package com.example.backend.service;

import com.example.backend.model.Employee;
import com.example.backend.model.Review;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class DataService {

    public List<Employee> employees = new ArrayList<>();
    public List<Review> reviews = new ArrayList<>();

    private int employeeIdCounter = 4;
    private int reviewIdCounter = 3;

    public DataService() {
        // Default employees
        employees.add(new Employee(1, "Muttanna Halake"));
        employees.add(new Employee(2, "Ravi"));
        employees.add(new Employee(3, "Sham"));

        // Default assigned reviews
        reviews.add(new Review(1, 2, 1));
        reviews.add(new Review(2, 3, 1));
    }

    public int nextEmployeeId() {
        return employeeIdCounter++;
    }

    public int nextReviewId() {
        return reviewIdCounter++;
    }
}
