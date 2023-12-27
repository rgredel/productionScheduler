package pl.edu.pk.wieik.productionScheduler.common;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.edu.pk.wieik.productionScheduler.exception.AlreadyExistsException;
import pl.edu.pk.wieik.productionScheduler.exception.InvalidRequestException;
import pl.edu.pk.wieik.productionScheduler.exception.NotFoundException;
import pl.edu.pk.wieik.productionScheduler.security.service.AuthService;
import pl.edu.pk.wieik.productionScheduler.user.model.User;

import java.util.function.Supplier;

import static org.springframework.http.ResponseEntity.*;

public abstract class BasicController {
    @Autowired
    private AuthService authService;
    protected User user() {
        return authService.getUser();
    }
    protected Long userId(){return authService.getUserId();}
    protected <RESULT> ResponseEntity<RESULT> handleRequest(Supplier<RESULT> supplier) {
        try {
            RESULT result = supplier.get();
            return result != null ? ok(result) : ok().build();
        } catch (InvalidRequestException ex) {
            return sendResponse(badRequest(), ex);
        } catch (NotFoundException ex) {
            return sendResponse(notFound(), ex);
        } catch (AlreadyExistsException ex) {
            return sendResponse(status(HttpStatus.CONFLICT), ex);
        }  catch (Exception ex) {
            return sendResponse(internalServerError(), ex);
        }
    }

    protected <RESULT> ResponseEntity<RESULT> sendResponse(ResponseEntity.HeadersBuilder response, Exception ex) {
        return response.header("message", ex.getMessage()).build();
    }
}
