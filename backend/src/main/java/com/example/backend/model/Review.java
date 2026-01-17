package com.example.backend.model;

public class Review {
    public Integer id;
    public Integer reviewerId;
    public Integer reviewForId;
    public String feedback;

    public Review() {
    }

    public Review(Integer id, Integer reviewerId, Integer reviewForId) {
        this.id = id;
        this.reviewerId = reviewerId;
        this.reviewForId = reviewForId;
        this.feedback = null;
    }
}
