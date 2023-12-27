package pl.edu.pk.wieik.productionScheduler.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pk.wieik.productionScheduler.user.model.User;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {
    Boolean existsByLogin(String login);
    Boolean existsByEmail(String email);

    Optional<User> findByLogin(String login);
}