package pl.edu.pk.wieik.productionScheduler.parameter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;

@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long> {
}