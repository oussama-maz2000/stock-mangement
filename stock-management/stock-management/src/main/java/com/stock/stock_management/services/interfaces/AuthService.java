package com.stock.stock_management.services.interfaces;

import com.stock.stock_management.dtos.auth.LoginRequest;
import com.stock.stock_management.dtos.auth.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest login);

}
