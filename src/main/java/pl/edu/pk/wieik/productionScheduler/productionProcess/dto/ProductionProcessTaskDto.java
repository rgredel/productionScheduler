package pl.edu.pk.wieik.productionScheduler.productionProcess.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import pl.edu.pk.wieik.productionScheduler.task.dto.TaskDto;
import pl.edu.pk.wieik.productionScheduler.user.dto.ReadUserDto;

import java.util.List;

@Data
@Builder
@ToString
public class ProductionProcessTaskDto {
    private Long id;
    private TaskDto task;
    private List<ParameterDto> parameters;
    private ProductionProcessTaskDto previousTask;
    private ReadUserDto user;
}
