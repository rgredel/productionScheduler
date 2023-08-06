package pl.edu.pk.wieik.productionScheduler.user;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.user.dto.CreateUserDto;
import pl.edu.pk.wieik.productionScheduler.user.model.Role;
import pl.edu.pk.wieik.productionScheduler.user.model.Users;
import pl.edu.pk.wieik.productionScheduler.user.repository.UsersRepository;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;
    public Users createPerson(CreateUserDto createUserDto){
        Boolean loginExists = usersRepository.existsByLogin(createUserDto.getLogin());
        Boolean mailExists = usersRepository.existsByEmail(createUserDto.getEmail());
        if(loginExists){
            throw new RuntimeException("Login: " + createUserDto.getLogin() + " already exists");
        }
        if(mailExists){
            throw new RuntimeException("Email: " + createUserDto.getEmail() + " already exists");
        }

        Users users = Users.builder()
                .login(createUserDto.getLogin())
                .email(createUserDto.getEmail())
                .password(createUserDto.getPassword())
                .fullName(createUserDto.getFullName())
                .role(Role.USER)
                .build();

        return usersRepository.save(users);

    }
}
