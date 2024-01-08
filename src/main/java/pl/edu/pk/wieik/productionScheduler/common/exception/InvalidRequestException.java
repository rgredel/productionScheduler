package pl.edu.pk.wieik.productionScheduler.common.exception;

public class InvalidRequestException extends RuntimeException{
    public InvalidRequestException(String message){
        super(message);
    }
}