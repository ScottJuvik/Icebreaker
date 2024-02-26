package com.G28.app;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Activity { 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private boolean rapport;
    private boolean favourite;

    @OneToMany(mappedBy = "ratedActivity")
    private List<Rating> ratings;

    @ManyToOne
    @JsonManagedReference
    private User creator;

    public Activity(User creator, String title, String description, boolean rapport) {
        setCreator(creator);
        titleValidator(title);
        descriptionValidator(description);
        this.rapport = rapport;
    }
    
    public Activity() {
    }

    private void setCreator(User creator) {
        creator.addActivity(this);
        this.creator = creator;
    }
    private void titleValidator(String title) {
        if (title.length() <= 60 && title.length() > 0) {
            this.title = title;
        } else
            throw new IllegalArgumentException(title + " Should be between 1 and 60 characters");
    }

    // Validates description
    private void descriptionValidator(String description) {
        if (description.length() <= 500 && description.length() > 0) {
            this.description = description;
        } else
            throw new IllegalArgumentException(title + " Should be between 1 and 500 characters");
    }

    public void addRating(Rating rating) {
        ratings.add(rating);
    }

    // Method to calculate the average rating
    public double getAverageRating() {
        if (ratings.isEmpty()) {
            return 0;
        }
        double sum = 0;
        for (Rating rating : ratings) {
            sum += rating.getValue();
        }
        return sum / ratings.size();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isRapport() {
        return rapport;
    }

    public void setRapport(boolean rapport) {
        this.rapport = rapport;
    }

    public boolean getFavourite() {
        return favourite;
    }

    public void setFavourite(boolean favourite) {
        this.favourite = favourite;
    }

}
