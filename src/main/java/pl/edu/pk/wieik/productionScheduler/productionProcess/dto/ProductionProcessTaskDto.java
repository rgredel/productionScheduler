package pl.edu.pk.wieik.productionScheduler.productionProcess.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import pl.edu.pk.wieik.productionScheduler.parameter.dto.ParameterDto;
import pl.edu.pk.wieik.productionScheduler.task.dto.TaskDto;

import java.util.List;

@Data
@Builder
@ToString
public class ProductionProcessTaskDto {
    private Long id;
    private TaskDto task;
    private List<ParameterDto> parameters;
    private List<Long> previousTaskIds;
    private List<Long> nextTaskIds;
    private Long userId;
}
