package com.G28.app;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int ratingValue;
    
    @ManyToOne
    private User author;
    
    @ManyToOne
    @JoinColumn(name = "activity_id")
    private Activity ratedActivity;

    public Rating(User author, int ratingValue) {
        this.author = author;
        setValue(ratingValue);
    }

    public int getValue() {
        return ratingValue;
    }

    public void setValue(int value) {
        if (value >= 0 && value <= 5) {
            this.ratingValue = value;
        } else
            throw new IllegalArgumentException(value + " Must be between 0 and 5");
    }

}
