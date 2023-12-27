package pl.edu.pk.wieik.productionScheduler.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AuthParams {
    private String token;
    private Long userId;
}
