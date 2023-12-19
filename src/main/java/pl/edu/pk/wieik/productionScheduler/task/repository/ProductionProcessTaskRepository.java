package pl.edu.pk.wieik.productionScheduler.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;

@Repository
public interface ProductionProcessTaskRepository extends JpaRepository<ProductionProcessTask, Long> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM production_process_task_previous_production_process_tasks WHERE previous_production_process_tasks_id = ?1",
            nativeQuery = true)
    void deletePreviousTasks(Long taskID);
}