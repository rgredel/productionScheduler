package pl.edu.pk.wieik.productionScheduler.security.config;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.edu.pk.wieik.productionScheduler.exception.NotFoundException;
import pl.edu.pk.wieik.productionScheduler.user.repository.UsersRepository;


@Configuration
@ConditionalOnProperty(prefix = "productionScheduler", name = "security", havingValue = "true")
@RequiredArgsConstructor
public class AuthenticationConfig {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public UserDetailsService userDetailsService(){
        return username -> usersRepository.findByLogin(username)
                .orElseThrow(() -> new NotFoundException(
                        "No such user with login: " + username));
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
