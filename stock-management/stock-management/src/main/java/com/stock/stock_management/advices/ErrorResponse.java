package com.stock.stock_management.advices;


import java.util.Map;

public record ErrorResponse(int status,
                            String message,
                            long timestamp,  Map<String, String> details) {}
