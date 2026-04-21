package com.stock.stock_management.exceptions;

public class DisabledUserException extends RuntimeException {
    public DisabledUserException(String message) {
        super(message);
    }
}
