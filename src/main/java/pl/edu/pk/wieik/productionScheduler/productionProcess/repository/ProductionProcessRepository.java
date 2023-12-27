package pl.edu.pk.wieik.productionScheduler.productionProcess.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;

import java.util.List;

@Repository
public interface ProductionProcessRepository extends JpaRepository<ProductionProcess, Long> {
    List<ProductionProcess> findByUserId(Long userId);
}