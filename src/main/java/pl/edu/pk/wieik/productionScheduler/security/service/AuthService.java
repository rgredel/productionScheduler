package pl.edu.pk.wieik.productionScheduler.security.service;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.security.AuthContextHolder;
import pl.edu.pk.wieik.productionScheduler.security.dto.LoginDto;
import pl.edu.pk.wieik.productionScheduler.security.dto.TokenDto;
import pl.edu.pk.wieik.productionScheduler.security.dto.TokenValidationDto;
import pl.edu.pk.wieik.productionScheduler.user.UserService;
import pl.edu.pk.wieik.productionScheduler.user.dto.ChangePasswordDto;
import pl.edu.pk.wieik.productionScheduler.user.dto.CreateUserDto;
import pl.edu.pk.wieik.productionScheduler.user.model.User;

import java.util.Date;

import static java.util.Objects.isNull;
import static org.hibernate.internal.util.collections.CollectionHelper.isEmpty;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public TokenDto register(CreateUserDto createUserDto) {
        User user = userService.createUser(createUserDto);
        var jwtToken = jwtService.generateToken(user);
        return TokenDto.builder().token(jwtToken).build();
    }

    public TokenValidationDto checkTokenExpiration(String token) {
        try {
            return TokenValidationDto.builder().isValid(!jwtService.extractExpiration(token).before(new Date())).build();
        } catch (ExpiredJwtException e) {
            return TokenValidationDto.builder().isValid(false).build();
        }
    }

    public TokenDto authenticate(LoginDto authenticationRequest) {
        User user = userService.getUserByLogin(authenticationRequest.getLogin());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getLogin(), authenticationRequest.getPassword()));
        var jwtToken = jwtService.generateToken(user);
        return TokenDto.builder().token(jwtToken).build();
    }


    public Long getUserId(){
        return AuthContextHolder.getAuthParams().getUserId();
    }

    public User getUser(){
        return userService.getUserById(getUserId());
    }

    public Long getUserIdByToken(String token) {
        String[] stripedToken = token.split(" ");
        if(isEmpty(stripedToken)){
            throw new IllegalArgumentException("Invalid token");
        }
        String username = jwtService.extractUsername(stripedToken[1]);
        User user = userService.getUserByLogin(username);

        return user.getId();
    }

    public void changePassword(ChangePasswordDto changePasswordDto) {
        if(isNull(changePasswordDto)){
            return;
        }
        User user = userService.getUserByLogin(changePasswordDto.getLogin());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(changePasswordDto.getLogin(), changePasswordDto.getOldPassword()));

        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        userService.saveUser(user);
    }
}
