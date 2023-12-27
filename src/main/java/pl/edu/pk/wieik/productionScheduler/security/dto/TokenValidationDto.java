package pl.edu.pk.wieik.productionScheduler.security.dto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenValidationDto {
    private Boolean isValid;
}
