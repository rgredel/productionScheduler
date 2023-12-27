package pl.edu.pk.wieik.productionScheduler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.exception.AlreadyExistsException;
import pl.edu.pk.wieik.productionScheduler.exception.NotFoundException;
import pl.edu.pk.wieik.productionScheduler.user.dto.CreateUserDto;
import pl.edu.pk.wieik.productionScheduler.user.dto.ReadUserDto;
import pl.edu.pk.wieik.productionScheduler.user.dto.UpdateUserDto;
import pl.edu.pk.wieik.productionScheduler.user.model.Role;
import pl.edu.pk.wieik.productionScheduler.user.model.User;
import pl.edu.pk.wieik.productionScheduler.user.repository.UsersRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public ReadUserDto getReadUserById(Long id) {
        User user = getUserById(id);
        return ReadUserDto.builder()
                .login(user.getLogin())
                .id(user.getId())
                .fullName(user.getFullName())
                .build();
    }

    public User getUserById(Long userId) {
        return usersRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(String.format("User with id %s doesnt exist", userId)));
    }

    public User createUser(CreateUserDto createUserDto) {
        Boolean loginExists = usersRepository.existsByLogin(createUserDto.getLogin());
        Boolean mailExists = usersRepository.existsByEmail(createUserDto.getEmail());
        if (loginExists) {
            throw new AlreadyExistsException("Login: " + createUserDto.getLogin() + " already exists");
        }
        if (mailExists) {
            throw new AlreadyExistsException("Email: " + createUserDto.getEmail() + " already exists");
        }

        User User = new User();
        User.setLogin(createUserDto.getLogin());
        User.setEmail(createUserDto.getEmail());
        User.setPassword(passwordEncoder.encode(createUserDto.getPassword()));
        User.setRole(Role.USER);
        return usersRepository.save(User);
    }

    public void updateUser(Long id, UpdateUserDto updateUserDto) {
        User user = usersRepository.findById(id).orElseThrow(() -> new NotFoundException("No such Users with id: " + id ));
        Boolean emailExists = usersRepository.existsByEmail(updateUserDto.getEmail());
        
        if (emailExists) {
            throw new AlreadyExistsException("Email: " + updateUserDto.getEmail() + " already in use");
        }

        user.setLogin(updateUserDto.getFullName());
        user.setEmail(updateUserDto.getEmail());
        usersRepository.save(user);
    }

    public void saveUser(User user) {
        usersRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (usersRepository.existsById(id)) usersRepository.deleteById(id);
    }



    public User getUserByLogin(String username) {
        User User = usersRepository.findByLogin(username).orElseThrow(() -> new NotFoundException("No such Users with login: " + username));
        return User;
    }

}
