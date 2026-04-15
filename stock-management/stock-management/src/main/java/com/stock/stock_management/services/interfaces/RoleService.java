package com.stock.stock_management.services.interfaces;

import com.stock.stock_management.dtos.role.AddRoleDto;
import com.stock.stock_management.dtos.role.RoleDto;
import com.stock.stock_management.models.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoleService {
    void save(AddRoleDto addRoleDto);
    Role findById(Long id);
    void update(Long id, AddRoleDto addRoleDto);
    Page<RoleDto> getAll(Pageable pageable);
    void delete(Long id);
}
