package com.stock.stock_management.repositories;

import com.stock.stock_management.models.User;

import java.util.Optional;

public interface UserRepo {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByRole_Id(String roleId);
}
