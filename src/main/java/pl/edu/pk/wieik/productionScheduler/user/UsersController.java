package pl.edu.pk.wieik.productionScheduler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pk.wieik.productionScheduler.user.model.Users;
import pl.edu.pk.wieik.productionScheduler.user.dto.CreateUserDto;

@RestController
@RequiredArgsConstructor
public class UsersController {
    private final UsersService usersService;

    @PostMapping("/users/auth/register")
    public ResponseEntity<Users> register(@RequestBody CreateUserDto createUserDto){
        return ResponseEntity.ok(usersService.createPerson(createUserDto));
    }
}
