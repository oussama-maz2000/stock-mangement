package com.stock.stock_management.services.interfaces;

import com.stock.stock_management.dtos.user.AddUserDto;
import com.stock.stock_management.dtos.user.UpdateUserDto;
import com.stock.stock_management.dtos.user.UserDto;
import com.stock.stock_management.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService{
    void createUser(AddUserDto addUserDto);
    User findUserById(String id);
    Page<UserDto> findAllUsers(String fullName,String username,String email,String phone,String roleId,Boolean enabled,Pageable pageable);
    void updateUser(String id, UpdateUserDto updateUserDto);
    void enableUser(String id);
    void disableUser(String id);
    void deleteUser(String id);
    void updateUserRole(String userId,String roleId);
}
