package com.stock.stock_management.exceptions;

public class DeletedUserException extends RuntimeException {
    public DeletedUserException(String message) {
        super(message);
    }
}
