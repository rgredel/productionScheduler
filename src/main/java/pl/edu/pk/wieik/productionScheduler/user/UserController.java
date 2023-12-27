package pl.edu.pk.wieik.productionScheduler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pk.wieik.productionScheduler.user.dto.ReadUserDto;
import pl.edu.pk.wieik.productionScheduler.user.dto.UpdateUserDto;


@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ReadUserDto getUser(@PathVariable Long id){
        return userService.getReadUserById(id);
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody UpdateUserDto updateUserDto){
        userService.updateUser(id, updateUserDto);
    }

    @DeleteMapping("/{id}")
    public void deletePerson(
            @PathVariable Long id){
        userService.deleteUser(id);
    }

}
