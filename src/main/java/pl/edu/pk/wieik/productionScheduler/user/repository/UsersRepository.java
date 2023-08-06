package pl.edu.pk.wieik.productionScheduler.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pk.wieik.productionScheduler.user.model.Users;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Boolean existsByLogin(String login);
    Boolean existsByEmail(String email);

    //todo why to use Optionals here?
    Optional<Users> findByLogin(String login);
}