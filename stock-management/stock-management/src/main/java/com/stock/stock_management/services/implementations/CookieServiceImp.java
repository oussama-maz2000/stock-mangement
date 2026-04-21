package com.stock.stock_management.services.implementations;

import com.stock.stock_management.services.interfaces.CookieService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

@Service
public class CookieServiceImp implements CookieService {

    @Override
    public void addHttpOnlyCookie(String name, String value, int maxAge, HttpServletResponse response) {
        Cookie cookie=new Cookie(name,value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);

    }

    public void deleteCookie(String name, HttpServletResponse response){
        Cookie cookie=new Cookie(name,null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
