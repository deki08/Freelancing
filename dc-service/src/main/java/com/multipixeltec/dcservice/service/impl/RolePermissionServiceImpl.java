package com.multipixeltec.dcservice.service.impl;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.multipixeltec.dcservice.dto.RolePermissionDto;
import com.multipixeltec.dcservice.model.RolePermission;
import com.multipixeltec.dcservice.repository.RolePermissionRepository;
import com.multipixeltec.dcservice.service.RolePermissionService;
import com.multipixeltec.dcservice.util.CommonUtil;

@Service
public class RolePermissionServiceImpl implements RolePermissionService {

    @Autowired
    private RolePermissionRepository rolepermissionRepository;

    @Override
    public RolePermission save(RolePermission rolepermission) {
        return rolepermissionRepository.save(rolepermission);
    }

    @Override
    public Optional<RolePermission> find(Long id) {
        return rolepermissionRepository.findById(id);
    }

    @Override
    public List<RolePermission> findAll() {
        return rolepermissionRepository.findAll();
    }

    @Override
    public List<RolePermission> findAll(Sort sort){
        return rolepermissionRepository.findAll(sort);
    }

    @Override
    public Page<RolePermission> findAll(Pageable pageable){
        return rolepermissionRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    rolepermissionRepository.deleteById(id);
    }

    @Override
    public void delete(RolePermission rolepermission) {
        rolepermissionRepository.delete(rolepermission);
    }

    @Override
    public void deleteAll() {
        rolepermissionRepository.deleteAll();
    }

    @Override
    public long count() {
        return rolepermissionRepository.count();
    }

    @Override
    public List<RolePermission> saveAll(List<RolePermission> permissions) {
        return rolepermissionRepository.saveAll(permissions);
    }

    @Override
    public void deleteAll(List<RolePermission> privileges) {
        rolepermissionRepository.deleteAll(privileges);
    }

    @Override
    public void deleteAll(Set<Long> longSet) {
        rolepermissionRepository.deleteAllByPermissionId(longSet);
    }
    
    @Transactional
   	@Override
   	public Map<String, Object> bulkUpdate(RolePermissionDto permissionDto) {
   		Map<String, Object> map = new LinkedHashMap<>();
   		try {
   			if (permissionDto != null && 
   					CommonUtil.isValueNotNullAndEmpty(permissionDto.getId().toString())
   					&& CommonUtil.isValueNotNullAndEmpty(permissionDto.getField()) 
   					&& (permissionDto.isValue() || !permissionDto.isValue())) {
   				
   				List<RolePermission> list = rolepermissionRepository.findByRoleId(permissionDto.getId());
   				for (RolePermission rolePermission : list) {
   					switch (permissionDto.getField()){
   		                case "list" : rolePermission.setList(permissionDto.isValue()); break;
   		                case "create" : rolePermission.setCreate(permissionDto.isValue()); break;
   		                case "view" : rolePermission.setView(permissionDto.isValue()); break;
   		                case "remove" : rolePermission.setRemove(permissionDto.isValue()); break;
   		                case "edit" : rolePermission.setEdit(permissionDto.isValue()); break;
   		                case "pay" : rolePermission.setPay(permissionDto.isValue()); break;
   					}
   				}
   				rolepermissionRepository.saveAll(list);
   				map.put("p_out", "1");
   				map.put("p_error_code", "SUCCESS-000");
   				map.put("p_error_message", "Permission updated successfully.");
   			}
   			else {
   				map.put("p_out", "0");
   				map.put("p_error_code", "ERROR-002");
   				map.put("p_error_message", "Invalid value provided.");
   			}
   		} catch (Exception e) {
   			e.printStackTrace();
   			map.put("p_out", "0");
   			map.put("p_error_code", "ERROR-003");
   			map.put("p_error_message", "Processing Error.");
   		}
   		return map;
   	}

}
