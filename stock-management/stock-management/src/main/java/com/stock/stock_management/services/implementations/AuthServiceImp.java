package com.stock.stock_management.services.implementations;

import com.stock.stock_management.dtos.auth.LoginRequest;
import com.stock.stock_management.dtos.auth.LoginResponse;
import com.stock.stock_management.dtos.user.UserDto;
import com.stock.stock_management.exceptions.DeletedUserException;
import com.stock.stock_management.exceptions.InvalidAuthenticationException;
import com.stock.stock_management.models.User;
import com.stock.stock_management.services.interfaces.AuthService;
import com.stock.stock_management.utils.JwtUtils;
import com.stock.stock_management.utils.OwnMapper;
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
    @Override
    public LoginResponse login(LoginRequest login) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(),login.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            UserDto userDto = OwnMapper.INSTANCE.toUserDto(user);
            return new LoginResponse(jwtUtils.generateJwtToken(userDto));

        } catch (BadCredentialsException e) {
            throw new InvalidAuthenticationException("Invalid username or password");
        } catch (DisabledException e) {
            throw new DisabledException("Account is disabled");
        } catch (LockedException e) {
            throw new DeletedUserException("Account is locked");
        }
    }
}
