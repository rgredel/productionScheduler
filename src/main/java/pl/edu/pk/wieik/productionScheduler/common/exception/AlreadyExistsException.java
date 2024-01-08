package pl.edu.pk.wieik.productionScheduler.common.exception;

public class AlreadyExistsException extends RuntimeException{
    public AlreadyExistsException(String message){
        super(message);
    }
}