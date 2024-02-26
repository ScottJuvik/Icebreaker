package com.G28.app;

import jakarta.persistence.GenerationType;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name="app_user")
class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private boolean alcoholFree;

  @OneToMany(mappedBy = "creator")
  @JsonIgnore
  private List<Activity> createdActivites;

 /*  @OneToMany(mappedBy = "user")
  private List<Activity> ratedActivites;
  
  @ManyToMany
  private List<Activity> favoriteActivites;
   */
  @OneToMany(mappedBy = "author")
  private List<Rating> createdRatings;

  private String password;
  private String userName;
   
  public User(String name, boolean alcoholFree, String password, String userName) {
    this.name = name;
    this.alcoholFree = alcoholFree;
    this.password = password;
    this.userName = userName;
    createdActivites = new ArrayList<>();
    createdRatings = new ArrayList<>();
  }
  
  public User() {
  }

public List<Activity> getCreatedActivites() {
    return new ArrayList<>(createdActivites);
}

/* public List<Activity> getRatedActivites() {
    return new ArrayList<>(ratedActivites);
}

public List<Activity> getFavoriteActivites() {
    return new ArrayList<>(favoriteActivites);   
} */

/* public List<Playlist> getSavedPlaylists() {
    return new ArrayList<>(savedPlaylists);
} */

public boolean isAlcoholFree() {
    return alcoholFree;
}

public void setAlcoholFree(boolean alcoholFree) {
    this.alcoholFree = alcoholFree;
}

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

public String getUserName() {
    return userName;
}

public void setUserName(String userName) {
    this.userName = userName;
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public void addActivity(Activity activity) {
    this.createdActivites.add(activity);
}

public void addRating(Rating rating) {
    //TODO
    ;
}
}

