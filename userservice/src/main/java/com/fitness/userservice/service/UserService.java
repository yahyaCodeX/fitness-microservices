package com.fitness.userservice.service;

import com.fitness.userservice.Repository.UserRepository;
import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.models.User;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository repository;

    public UserResponse register(RegisterRequest request) {

        if(repository.existsByEmail(request.getEmail())){
            User existingUser= repository.findByEmail(request.getEmail());
            UserResponse existingUserResponse=new UserResponse();
            existingUserResponse.setEmail(existingUser.getEmail());
            existingUserResponse.setKeycloakId(existingUser.getKeycloakId());
            existingUserResponse.setPassword(existingUser.getPassword());
            existingUserResponse.setFirstName(existingUser.getFirstName());
            existingUserResponse.setLastName(existingUser.getLastName());
            existingUserResponse.setId(existingUser.getId());
            existingUserResponse.setCreatedAt(existingUser.getCreatedAt());
            existingUserResponse.setUpdatedAt(existingUser.getUpdatedAt());
            return existingUserResponse;
        }
        User user=new User();
        user.setEmail(request.getEmail());
        user.setKeycloakId(request.getKeycloakId());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User saveduser= repository.save(user);

        UserResponse userResponse=new UserResponse();
        userResponse.setEmail(saveduser.getEmail());
        userResponse.setPassword(saveduser.getPassword());
        userResponse.setFirstName(saveduser.getFirstName());
        userResponse.setLastName(saveduser.getLastName());
        userResponse.setId(saveduser.getId());
        userResponse.setCreatedAt(saveduser.getCreatedAt());
        userResponse.setUpdatedAt(saveduser.getUpdatedAt());

        return userResponse;
    }

    public  UserResponse getUser(String userId) {
        User user=repository.findById(userId)
                .orElseThrow(()-> new RuntimeException("user not found"));
        UserResponse userResponse=new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        userResponse.setPassword(user.getPassword());
        return userResponse;

    }

    public  Boolean existsById(String userId) {
        return repository.existsByKeycloakId(userId);
    }
}
