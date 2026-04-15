package com.stock.stock_management.utils;


import com.stock.stock_management.dtos.role.AddRoleDto;
import com.stock.stock_management.dtos.role.RoleDto;
import com.stock.stock_management.models.Role;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface OwnMapper {

    OwnMapper INSTANCE = Mappers.getMapper(OwnMapper.class);

    /*ROLES MAPPERS*/
    Role toRole(AddRoleDto addRoleDto);
    RoleDto toRoleDto(Role role);

}
