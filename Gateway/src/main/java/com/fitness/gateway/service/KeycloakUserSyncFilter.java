package com.fitness.gateway.service;

import com.fitness.gateway.dto.RegisterRequest;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.text.ParseException;

@Component
@Slf4j
@RequiredArgsConstructor
public class KeycloakUserSyncFilter implements WebFilter {

    private final userService userService;


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String userID=exchange.getRequest().getHeaders().getFirst("X-User-ID");
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        RegisterRequest Registeredrequest=getUserDetails(token);
        if(userID == null){
             userID = Registeredrequest.getKeycloakId();
        }
        if(userID != null && token != null){
            String finalUserID = userID;
            return userService.validateUser(userID)
                    .flatMap(exist ->{
                        if(!exist){
                            //Register
                            if(Registeredrequest!=null){
                                return userService.registerUSer(Registeredrequest)
                                        .then(Mono.empty());
                            }else{
                                return Mono.empty();
                            }
                        }else{
                            log.info("user already exist skipping sync ");
                            return Mono.empty();
                        }
                    }).then(Mono.defer(() -> {
                        ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                                .header("X-User-ID", finalUserID)
                                .build();
                        return chain.filter(exchange.mutate().request(mutatedRequest).build());
                    }));
        }
        return chain.filter(exchange);
    }

    private RegisterRequest getUserDetails(String token) {
        try {
            String tokenWithoutBearer=token.replace("Bearer","").trim();
            SignedJWT signedJWT=SignedJWT.parse(tokenWithoutBearer);
            JWTClaimsSet claimsSet=signedJWT.getJWTClaimsSet();

            RegisterRequest request=new RegisterRequest();
            request.setEmail(claimsSet.getStringClaim("email"));
            request.setKeycloakId(claimsSet.getStringClaim("sub"));
            request.setFirstName(claimsSet.getStringClaim("given_name"));
            request.setLastName(claimsSet.getStringClaim("family_name"));
            request.setPassword("12345");

            return request;

        }catch (ParseException e) {
            log.error("Failed to parse JWT: {}", e.getMessage());
            return null;
        }
    }
}
