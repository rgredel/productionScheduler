package pl.edu.pk.wieik.productionScheduler.user.dto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangePasswordDto {
    private String login;
    private String oldPassword;
    private String newPassword;
}
