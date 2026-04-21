package com.stock.stock_management.services.implementations;

import com.stock.stock_management.dtos.auth.LoginRequest;
import com.stock.stock_management.dtos.auth.LoginResponse;
import com.stock.stock_management.dtos.user.UserDto;
import com.stock.stock_management.exceptions.DeletedUserException;
import com.stock.stock_management.exceptions.InvalidAuthenticationException;
import com.stock.stock_management.models.User;
import com.stock.stock_management.services.interfaces.AuthService;
import com.stock.stock_management.services.interfaces.CookieService;
import com.stock.stock_management.utils.JwtUtils;
import com.stock.stock_management.utils.OwnMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final CookieService cookieService;
    @Override
    public LoginResponse login(LoginRequest login, HttpServletResponse httpServletResponse) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(),login.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            UserDto userDto = OwnMapper.INSTANCE.toUserDto(user);
            LoginResponse loginResponse =new LoginResponse(jwtUtils.generateJwtToken(userDto));
            cookieService.addHttpOnlyCookie("jwt",loginResponse.getToken(),7*24*60*60,httpServletResponse);
            System.out.println(httpServletResponse);
            return loginResponse;

        } catch (BadCredentialsException e) {
            throw new InvalidAuthenticationException("Invalid username or password");
        } catch (DisabledException e) {
            throw new DisabledException("Account is disabled");
        } catch (LockedException e) {
            throw new DeletedUserException("Account is locked");
        }
    }
}
