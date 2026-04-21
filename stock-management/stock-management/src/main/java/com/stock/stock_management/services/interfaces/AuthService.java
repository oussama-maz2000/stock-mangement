package com.stock.stock_management.services.interfaces;

import com.stock.stock_management.dtos.auth.LoginRequest;
import com.stock.stock_management.dtos.auth.LoginResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    LoginResponse login(LoginRequest login,HttpServletResponse httpServletResponse);

}
