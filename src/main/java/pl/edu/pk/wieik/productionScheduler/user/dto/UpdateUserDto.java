package pl.edu.pk.wieik.productionScheduler.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateUserDto {
    private String email;
    private String fullName;
}
