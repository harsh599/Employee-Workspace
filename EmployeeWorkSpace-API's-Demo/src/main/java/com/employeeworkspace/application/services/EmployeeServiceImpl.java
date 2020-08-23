package com.employeeworkspace.application.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employeeworkspace.application.DAO.EmployeeRepository;
import com.employeeworkspace.application.entity.Employee;
import com.employeeworkspace.application.exception.RecordNotFoundException;

@Service
public class EmployeeServiceImpl {

	@Autowired
	private EmployeeRepository employeeDAO;
	
	@Transactional
	public List<Employee> getAllEmployeeDetails() {
		return employeeDAO.findAll();
	}
	
	@Transactional
	public Boolean deleteEmployee(int id) {
		 Employee employee = employeeDAO.findById(id)
				   .orElseThrow(() -> new RecordNotFoundException("Employee not found for this id :: " + id));
		 employeeDAO.delete(employee);
		 return true;
				
	}
	
	@Transactional
	public Optional<Employee> getEmployeeById(int id) {
		return employeeDAO.findById(id);
	}
	
	@Transactional
	public int saveEmployee(Employee emp) {
		Employee createdEmployee = employeeDAO.save(emp);
		if(createdEmployee != null) {
			return createdEmployee.getId();	
		}
		else {
			throw new RecordNotFoundException("Record Failed to get created");
		}
	}
	

	@Transactional
	public Employee updateEmployee(Employee emp) {
		Employee updatedEmployee = employeeDAO.save(emp);
		if(updatedEmployee != null) {
			return updatedEmployee;	
		}
		else {
			throw new RecordNotFoundException("Record Failed to get Updated!!");
		}
		
	}
	
	
	
}
