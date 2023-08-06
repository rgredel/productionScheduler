package pl.edu.pk.wieik.productionScheduler.task.dto;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@ToString(callSuper = true)
public class TaskDto extends CreateTaskDto{
    private Long id;
    private String name;
    private String description;
   // private List<ProductionProcessTask> productionProcessTasks;
}

