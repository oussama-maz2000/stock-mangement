package com.stock.stock_management.controller;


import com.stock.stock_management.dtos.auth.LoginRequest;
import com.stock.stock_management.dtos.auth.LoginResponse;
import com.stock.stock_management.services.interfaces.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuhController {


    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest login, HttpServletResponse httpServletResponse){
        return ResponseEntity.ok(authService.login(login,httpServletResponse).getToken());
    }







}
