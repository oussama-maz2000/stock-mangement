package com.stock.stock_management.advices;


import com.stock.stock_management.exceptions.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;


@RestControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GeneralAdvice {

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage(), System.currentTimeMillis(), null),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(value = DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateResourceException(DuplicateResourceException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage(), System.currentTimeMillis(), null),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(value = DeletedUserException.class)
    public ResponseEntity<ErrorResponse> handleDeletedUserException(DeletedUserException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), System.currentTimeMillis(), null),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(value = DisabledUserException.class)
    public ResponseEntity<ErrorResponse> handleDisabledUserException(DisabledUserException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), System.currentTimeMillis(), null),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(value = InvalidAuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleInvalidAuthenticationException(InvalidAuthenticationException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), System.currentTimeMillis(), null),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(value = DeleteException.class)
    public ResponseEntity<ErrorResponse> handleDeleteException(DeleteException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage(), System.currentTimeMillis(), null),
                HttpStatus.CONFLICT
        );
    }

    // ADD THIS
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {

        Map<String, String> details = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err -> {
                   details.putIfAbsent(err.getField(), err.getDefaultMessage());
        });

        ErrorResponse body = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                System.currentTimeMillis(),
                details
        );

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }


}
