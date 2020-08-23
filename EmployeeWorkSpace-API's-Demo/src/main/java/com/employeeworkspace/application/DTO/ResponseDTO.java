package com.employeeworkspace.application.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseDTO {

	private int statusCode;
	private String message;
	private String statusMessage;
	private Object data;
}
