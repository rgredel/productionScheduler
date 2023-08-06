package pl.edu.pk.wieik.productionScheduler.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class ReadUserDto {
    private Long id;
    private String login;
    private String fullName;
    private String email;
}
