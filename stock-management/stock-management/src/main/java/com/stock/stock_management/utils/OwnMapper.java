package com.stock.stock_management.utils;


import com.stock.stock_management.dtos.role.AddRoleDto;
import com.stock.stock_management.dtos.role.RoleDto;
import com.stock.stock_management.dtos.user.AddUserDto;
import com.stock.stock_management.dtos.user.UpdateUserDto;
import com.stock.stock_management.dtos.user.UserDto;
import com.stock.stock_management.models.Role;
import com.stock.stock_management.models.User;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface OwnMapper {

    OwnMapper INSTANCE = Mappers.getMapper(OwnMapper.class);

    /*ROLES MAPPERS*/
    Role toRole(AddRoleDto addRoleDto);
    RoleDto toRoleDto(Role role);



    /* USER MAPPERS */
    User toUser(AddUserDto addUserDto);
    @Mapping(target = "role", expression = "java(user.getRole() != null ? user.getRole().getName() : null)")
    UserDto toUserDto(User user);
    void mapUserFromDto(UpdateUserDto userDto, @MappingTarget User user);}
