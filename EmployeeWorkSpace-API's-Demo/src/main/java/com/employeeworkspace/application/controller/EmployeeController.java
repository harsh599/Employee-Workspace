package com.employeeworkspace.application.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.employeeworkspace.application.DTO.ResponseDTO;
import com.employeeworkspace.application.entity.Employee;
import com.employeeworkspace.application.exception.RecordNotFoundException;
import com.employeeworkspace.application.properties.EmployeeWorkSpaceProperties;
import com.employeeworkspace.application.services.EmployeeServiceImpl;

@CrossOrigin(origins = "http://localhost:4200")//fix made for fixing cors policy error in angular
@RestController
public class EmployeeController {

	@Autowired
	private EmployeeServiceImpl empService;

	@Autowired
	private EmployeeWorkSpaceProperties properties;

	Map m = new HashMap<>();

	private static Logger logger = LoggerFactory.getLogger(EmployeeController.class);// imported from slf4j

	@GetMapping("/employee")
	public ResponseDTO getIndividualEmployees() {
//		logger.debug('(' . __LINE__ . ') ' . __FILE__ . ': FUNCTION ' . __FUNCTION__ . ' called');
//		logger.debug('  ******  URI called ' . $_SERVER['REQUEST_URI'] . '  ******  ');
//		logger.debug('  ******  Method Used ' . $_SERVER['REQUEST_METHOD'] . '  ******  ');
		List<Employee> allEmployees = empService.getAllEmployeeDetails();
		Map m = new HashMap<>();
		m.put("employees", allEmployees);
		return ResponseDTO.builder().statusCode(200).statusMessage("OK").message("Record Found").data(m).build();
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/employee")
	public ResponseDTO saveEmployee(@RequestBody Employee saveEmployee) {
		int id = empService.saveEmployee(saveEmployee);
		m.put("id", id);
		return ResponseDTO.builder().statusCode(200).statusMessage("Created").message("Record Has been created").data(m)
				.build();

	}

	@PutMapping("/employee/{employeeId}")
	public ResponseDTO updateEmployee(@PathVariable String employeeId, @RequestBody Employee saveEmployee) {
		saveEmployee.setId(Integer.parseInt(employeeId));
		empService.updateEmployee(saveEmployee);
		m.put("employee", saveEmployee);
		return ResponseDTO.builder().statusCode(201).statusMessage("Created")
				.message("Record Has been Updated Successfully!!").data(m).build();
	}

	@DeleteMapping("/employee/{employeeId}")
	public ResponseDTO deleteEmployee(@PathVariable int employeeId) {
		empService.deleteEmployee(employeeId);
		return ResponseDTO.builder().statusCode(201).statusMessage("Deleted")
				.message("Record Has been Deleted Successfully!!").build();
	}

}
