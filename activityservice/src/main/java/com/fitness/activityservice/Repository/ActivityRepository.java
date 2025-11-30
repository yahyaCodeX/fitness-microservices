package com.fitness.activityservice.Repository;

import com.fitness.activityservice.models.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActivityRepository extends MongoRepository<Activity,String> {

}
