package com.stock.stock_management.utils;

import com.stock.stock_management.dtos.role.AddRoleDto;
import com.stock.stock_management.dtos.role.RoleDto;
import com.stock.stock_management.dtos.user.AddUserDto;
import com.stock.stock_management.dtos.user.UpdateUserDto;
import com.stock.stock_management.dtos.user.UserDto;
import com.stock.stock_management.models.Role;
import com.stock.stock_management.models.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-21T13:41:30+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class OwnMapperImpl implements OwnMapper {

    @Override
    public Role toRole(AddRoleDto addRoleDto) {
        if ( addRoleDto == null ) {
            return null;
        }

        Role role = new Role();

        role.setName( addRoleDto.getName() );

        return role;
    }

    @Override
    public RoleDto toRoleDto(Role role) {
        if ( role == null ) {
            return null;
        }

        RoleDto roleDto = new RoleDto();

        if ( role.getId() != null ) {
            roleDto.setId( String.valueOf( role.getId() ) );
        }
        roleDto.setName( role.getName() );

        return roleDto;
    }

    @Override
    public User toUser(AddUserDto addUserDto) {
        if ( addUserDto == null ) {
            return null;
        }

        User user = new User();

        user.setFullName( addUserDto.getFullName() );
        user.setUsername( addUserDto.getUsername() );
        user.setEmail( addUserDto.getEmail() );
        user.setPhone( addUserDto.getPhone() );
        user.setPassword( addUserDto.getPassword() );

        return user;
    }

    @Override
    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        if ( user.getId() != null ) {
            userDto.setId( String.valueOf( user.getId() ) );
        }
        userDto.setFullName( user.getFullName() );
        userDto.setUsername( user.getUsername() );
        userDto.setEmail( user.getEmail() );
        userDto.setPhone( user.getPhone() );
        userDto.setEnabled( user.isEnabled() );
        userDto.setDeleted( user.isDeleted() );

        userDto.setRole( user.getRole() != null ? user.getRole().getName() : null );

        return userDto;
    }

    @Override
    public void mapUserFromDto(UpdateUserDto userDto, User user) {
        if ( userDto == null ) {
            return;
        }

        user.setFullName( userDto.getFullName() );
        user.setUsername( userDto.getUsername() );
        user.setEmail( userDto.getEmail() );
        user.setPhone( userDto.getPhone() );
    }
}
