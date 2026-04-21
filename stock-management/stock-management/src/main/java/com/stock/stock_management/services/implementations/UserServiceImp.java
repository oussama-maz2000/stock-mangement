package com.stock.stock_management.services.implementations;


import com.stock.stock_management.dtos.user.AddUserDto;
import com.stock.stock_management.dtos.user.UpdateUserDto;
import com.stock.stock_management.dtos.user.UserDto;
import com.stock.stock_management.models.User;
import com.stock.stock_management.repositories.UserRepo;
import com.stock.stock_management.services.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    @Override
    public void createUser(AddUserDto addUserDto) {

    }

    @Override
    public User findUserById(String id) {
        return userRepo.;
    }

    @Override
    public Page<UserDto> findAllUsers(String fullName, String username, String email, String phone, String roleId, Boolean enabled, Pageable pageable) {
        return null;
    }

    @Override
    public void updateUser(String id, UpdateUserDto updateUserDto) {

    }

    @Override
    public void enableUser(String id) {

    }

    @Override
    public void disableUser(String id) {

    }

    @Override
    public void deleteUser(String id) {

    }

    @Override
    public void updateUserRole(String userId, String roleId) {

    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        return userRepo.findByUsername(usernameOrEmail)
                .or(() -> userRepo.findByEmail(usernameOrEmail))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + usernameOrEmail));
    }
}
