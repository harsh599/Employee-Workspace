package com.employeeworkspace.application.exception;

public class RecordNotFoundException extends RuntimeException {

	public RecordNotFoundException(String message) {
		super(message);
	}
}
