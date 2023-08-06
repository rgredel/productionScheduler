package pl.edu.pk.wieik.productionScheduler.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;

@Repository
public interface ProductionProcessTaskRepository extends JpaRepository<ProductionProcessTask, Long> {
}