package com.cts.authenticationservice.exception;

import java.util.Date;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.cts.authenticationmicroservice.model.MessageResponse;

import feign.FeignException;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class AuthExceptionHandler extends ResponseEntityExceptionHandler{
	

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(FeignException.class)
	public ResponseEntity<MessageResponse> handleFeignException(FeignException fe) {
		return ResponseEntity.badRequest().body(new MessageResponse(new Date(),fe.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));

	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(IdAlredyExistsException.class)
	public ResponseEntity<MessageResponse> handleIdAlreadyExistException(IdAlredyExistsException ie) {
		MessageResponse messageResponse = new MessageResponse();
		messageResponse.setMessage(ie.getMessage());
		messageResponse.setStatus(HttpStatus.BAD_REQUEST);
		messageResponse.setTimeStamp(new Date());
		return new ResponseEntity<>(messageResponse, HttpStatus.BAD_REQUEST);

	}
}