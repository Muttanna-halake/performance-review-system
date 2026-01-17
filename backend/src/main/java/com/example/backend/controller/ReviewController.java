package com.example.backend.controller;

import com.example.backend.model.Review;
import com.example.backend.service.DataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/reviews")
public class ReviewController {

    private final DataService service;

    public ReviewController(DataService service) {
        this.service = service;
    }

    // ADMIN: VIEW ALL reviews
    @GetMapping
    public List<Review> getAllReviews() {
        return service.reviews;
    }

    // ADMIN: CREATE / ASSIGN review
    @PostMapping
    public Review createReview(@RequestBody Review review) {
        review.id = service.nextReviewId();
        review.feedback = null;
        service.reviews.add(review);
        return review;
    }

    // ADMIN: UPDATE review assignment
    @PutMapping("/{id}")
    public String updateReview(@PathVariable int id, @RequestBody Review review) {
        for (Review r : service.reviews) {
            if (r.id == id) {
                r.reviewerId = review.reviewerId;
                r.reviewForId = review.reviewForId;
                return "Review updated successfully";
            }
        }
        return "Review not found";
    }

    // ADMIN: DELETE review
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable int id) {
        boolean removed = service.reviews.removeIf(r -> r.id == id);
        return removed ? "Review deleted successfully" : "Review not found";
    }

    // EMPLOYEE: Get pending reviews for employee (reviewer)
    @GetMapping("/pending/{employeeId}")
    public List<Review> getPendingReviews(@PathVariable int employeeId) {
        return service.reviews.stream()
                .filter(r -> r.reviewerId == employeeId && r.feedback == null)
                .collect(Collectors.toList());
    }

    // EMPLOYEE: Submit feedback
    @PostMapping("/feedback")
    public String submitFeedback(@RequestBody Review review) {
        for (Review r : service.reviews) {
            if (r.id == review.id) {
                r.feedback = review.feedback;
                return "Feedback saved successfully";
            }
        }
        return "Review not found";
    }
}
