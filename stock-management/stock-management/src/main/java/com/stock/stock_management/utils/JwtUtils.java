package com.stock.stock_management.utils;

import com.stock.stock_management.dtos.user.UserDto;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.jackson.databind.ObjectMapper;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

public class JwtUtils {

    private final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.token.secret}")
    private String jwtSecret;

    @Value("${jwt.token.expire-in-ms}")
    private String tokenExpireInMs;

    private final ObjectMapper objectMapper = new ObjectMapper();


    public String generateJwtToken(UserDto userDto) {
        return Jwts.builder().subject(userDto.getId())
                .issuedAt(new Date())
                .claim("id", userDto.getId())
                .claim("user",userDto)
                .expiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpireInMs)))
                .signWith(getSecretKey()).compact();
    }


    private SecretKey getSecretKey() {
        byte[] encodedKey = Base64.getDecoder().decode(jwtSecret);
        return Keys.hmacShaKeyFor(encodedKey);
    }

    public boolean validateJwtToken(String jwt) {
        try {
            Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(jwt);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
            throw e;
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
            throw e;
        }
        return false;
    }

    public String getSubjectFromJwt(String token) {
        return Jwts.parser().verifyWith(getSecretKey()).build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public UserDto getUserFromJwt(String token) {
        return objectMapper.convertValue(
                Jwts.parser().verifyWith(getSecretKey()).build()
                        .parseSignedClaims(token)
                        .getPayload()
                        .get("user"),
                UserDto.class
        );

    }
}
