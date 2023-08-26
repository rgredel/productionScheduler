package pl.edu.pk.wieik.productionScheduler.productionProcess.task;

import lombok.Builder;
import lombok.Data;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.AddTaskParameterDto;

import java.util.List;

@Data
@Builder
public class AddProductionProcessTaskDto {
    private Long taskId;
    private List<AddTaskParameterDto> parameters;
    private List<Long> previousTaskIds;
    private Long userId;
}
