package com.fitness.aiservice.service;

import com.fitness.aiservice.Repository.RecommendationRepository;
import com.fitness.aiservice.models.Recommendation;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final RecommendationRepository recommendationRepository;


    public  List<Recommendation> getUserRecommendatoin(String userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public Recommendation getActivityRecommendation(String activityId) {
        return recommendationRepository.findByActivityId(activityId)
                .orElseThrow(() -> new RuntimeException("No Recommendations Found for this activityId "+ activityId));

    }
}
