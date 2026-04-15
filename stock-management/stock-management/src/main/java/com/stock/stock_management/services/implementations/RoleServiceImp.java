package com.stock.stock_management.services.implementations;

import com.stock.stock_management.dtos.role.AddRoleDto;
import com.stock.stock_management.dtos.role.RoleDto;
import com.stock.stock_management.exceptions.DeleteException;
import com.stock.stock_management.exceptions.DuplicateResourceException;
import com.stock.stock_management.exceptions.ResourceNotFoundException;
import com.stock.stock_management.models.Role;
import com.stock.stock_management.repositories.RoleRepo;
import com.stock.stock_management.services.interfaces.RoleService;
import com.stock.stock_management.utils.OwnMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RoleServiceImp implements RoleService {
    private final RoleRepo roleRepo;

    @Override
    @Transactional
    public void save(AddRoleDto addRoleDto) {
        String formattedName = formatRoleName(addRoleDto.getName());
        if (roleRepo.findByName(formattedName).isPresent()) {
            throw new DuplicateResourceException("Impossible de créer le rôle : le nom '" + formattedName + "' est déjà utilisé.");
        }
        Role role = OwnMapper.INSTANCE.toRole(addRoleDto);
        role.setName(formattedName);
        roleRepo.save(role);
    }

    @Override
    public Role findById(Long id) {
        return roleRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Le rôle avec l'ID " + id + " n'existe pas dans le système."));
    }

    @Override
    @Transactional
    public void update(Long id, AddRoleDto addRoleDto) {
        Role role = findById(id);
        String newName = formatRoleName(addRoleDto.getName());
        roleRepo.findByName(newName).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new DuplicateResourceException("Modification impossible : le nom '" + newName + "' est déjà attribué à un autre rôle.");
            }
        });
        role.setName(newName);
        roleRepo.save(role);
    }

    @Override
    public Page<RoleDto> getAll(Pageable pageable) {
        return roleRepo.findAll(pageable).map(OwnMapper.INSTANCE::toRoleDto);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Role role = roleRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role not found"));

//        if (userRepo.existsByRoleId(id)) {
//            throw new DeleteException("Action refusée : le rôle '" + role.getName() + "' est actuellement attribué à un ou plusieurs utilisateurs.");
//        }

        try {
            roleRepo.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DeleteException("Ce rôle est utilisé et ne peut pas être supprimé.");
        }
    }

    private String formatRoleName(String name) {
        if (name == null) return "";
        String upperName = name.toUpperCase().trim();
        return upperName.startsWith("ROLE_") ? upperName : "ROLE_" + upperName;
    }

}
