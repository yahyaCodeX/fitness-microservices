package com.fitness.activityservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
@RequiredArgsConstructor
public class userValidationService {
    private final WebClient userServiceWebClient;

    public boolean validateUser(String userId){
        try{
            return Boolean.TRUE.equals(userServiceWebClient.get()
                    .uri("/api/users/{userId}/validate", userId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block());

        } catch (WebClientResponseException e) {
            e.printStackTrace();
        }
        return  false;
    }
//
//    public boolean validateUser(String userId){
//        try {
//            Boolean result = userServiceWebClient.get()
//                    .uri("/api/users/{userId}/validate", userId)
//                    .retrieve()
//                    .bodyToMono(Boolean.class)
//                    .block();
//
//            System.out.println("UserService validation returned: " + result);
//            return result != null && result;
//
//        } catch (Exception e) {
//            System.out.println("Validation error: " + e.getMessage());
//            return false;
//        }
//    }

}
