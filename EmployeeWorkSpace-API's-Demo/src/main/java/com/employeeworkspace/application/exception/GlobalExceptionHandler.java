package com.employeeworkspace.application.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.employeeworkspace.application.DTO.ResponseDTO;
import com.employeeworkspace.application.controller.EmployeeController;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static Logger logger = LoggerFactory.getLogger(EmployeeController.class);//imported from slf4j
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseDTO handleMethodArgumentNotValidException(MethodArgumentNotValidException exc) {
		
		Map<String,String> errors = new HashMap<>();
		
		exc.getBindingResult().getAllErrors().forEach((error) ->{
			String fieldName = ((FieldError)error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		
		return ResponseDTO.builder().statusCode(403).
			   statusMessage("Bad Request").message("Field Error Occured").data(errors).build();
	}
	
	@ExceptionHandler(Exception.class)
    public final ResponseEntity<ResponseDTO> handleAllExceptions(Exception ex, WebRequest request) {
		logger.error("Exception error level get method with logger called");
		List<String> details = new ArrayList<>();
        details.add(ex.getLocalizedMessage());
//        ErrorResponse error = new ErrorResponse("Server Error", details);
//        return new ResponseEntity(error, HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity(ResponseDTO.builder()
        		.statusCode(409)
        		.message("General Exception Occured")
        		.data(details).build(),HttpStatus.CONFLICT);
    }
 
   @ExceptionHandler(RecordNotFoundException.class)
    public final ResponseEntity<Object> handleUserNotFoundException(RecordNotFoundException ex, WebRequest request) {
	   logger.error("RecordNotFoundException error level get method with logger called"); 
	   List<String> details = new ArrayList<>();
        details.add(ex.getLocalizedMessage());
//        ErrorResponse error = new ErrorResponse("Record Not Found", details);
//        return new ResponseEntity(error, HttpStatus.NOT_FOUND);
        return new ResponseEntity(ResponseDTO.builder()
        		.statusCode(409)
        		.message("Resource Not Found")
        		.data(details).build(),HttpStatus.CONFLICT);
    }
 
}
