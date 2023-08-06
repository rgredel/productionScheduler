package pl.edu.pk.wieik.productionScheduler.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
public class CreateUserDto {
    private String login;
    private String email;
    private String fullName;
    private String password;

}
