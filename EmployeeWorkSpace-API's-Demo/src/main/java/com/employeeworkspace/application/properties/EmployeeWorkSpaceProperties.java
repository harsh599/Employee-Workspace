package com.employeeworkspace.application.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component//for easily autowiring it easily any where in the code
@Data
@ConfigurationProperties(prefix = "employeeworkspace")
public class EmployeeWorkSpaceProperties {

	public String author;
	
	public String reason;
	
	public String technology;
	
	public String description;
}
