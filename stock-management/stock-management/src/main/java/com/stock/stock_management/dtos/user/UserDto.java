package com.stock.stock_management.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserDto {
    private String id;
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private String role;
    private boolean enabled;
    private boolean deleted;
}
