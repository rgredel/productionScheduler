package pl.edu.pk.wieik.productionScheduler.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pk.wieik.productionScheduler.security.dto.LoginDto;
import pl.edu.pk.wieik.productionScheduler.security.dto.TokenDto;
import pl.edu.pk.wieik.productionScheduler.security.dto.TokenValidationDto;
import pl.edu.pk.wieik.productionScheduler.security.service.AuthService;
import pl.edu.pk.wieik.productionScheduler.user.dto.ChangePasswordDto;
import pl.edu.pk.wieik.productionScheduler.user.dto.CreateUserDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<TokenDto> register(@RequestBody CreateUserDto createUserDto){
        return ResponseEntity.ok(authService.register(createUserDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(authService.authenticate(loginDto));
    }

    @PostMapping("/validate-token/{token}")
    public TokenValidationDto checkTokenExpiration(@PathVariable String token){
        return authService.checkTokenExpiration(token);
    }

    @PutMapping("/change-password")
    public void changePassword(@RequestBody ChangePasswordDto changePasswordDto){
        authService.changePassword(changePasswordDto);
    }
}
