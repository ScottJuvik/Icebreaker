package com.G28.app;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;




@CrossOrigin
@RestController
@RequestMapping()
public class IceBreakerController {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ActivityRepository activityRepository;
    
    @GetMapping("/test")
    public void testh2() {
        User testUser = new User("Emil", false, "test", "test");
        Activity testActivity = new Activity(testUser, "Stein Saks Papir","En artig lek for hele familien som innebærer diverse våpen som steiner, saks og papir", false);
        Activity testActivity2 =  new Activity(testUser, "Dyreleken","Første spiller sier navnet sitt og et dyr som begynner på samme forbokstav, deretter sier nestemann førstemanns navn og dyr og så sitt eget navn pluss dyrenavn. Slik fortsetter det helt til sistemann har sagt alle navn/dyrenavn i gruppa.", false);
 
        userRepository.save(testUser);
        activityRepository.save(testActivity); 
        activityRepository.save(testActivity2);
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();

    }

    @GetMapping("/activities")
    public List<Activity> getActivities() {
        return activityRepository.findAll();
    }
    
    
    
}
