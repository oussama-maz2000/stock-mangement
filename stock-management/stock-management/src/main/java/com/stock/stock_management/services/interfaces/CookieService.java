package com.stock.stock_management.services.interfaces;

import jakarta.servlet.http.HttpServletResponse;

public interface CookieService {
    void addHttpOnlyCookie(String name, String value, int maxAge, HttpServletResponse response);
}
