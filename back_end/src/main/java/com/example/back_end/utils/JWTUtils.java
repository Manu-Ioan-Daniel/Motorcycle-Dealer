package com.example.back_end.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
@AllArgsConstructor
public class JWTUtils {

    private final SecretKey signingKey;

    public String generateToken(Long userId){
        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15 ))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

}
