package pl.edu.pk.wieik.productionScheduler.task.dto;

import lombok.Builder;
import lombok.Data;
import pl.edu.pk.wieik.productionScheduler.parameter.dto.ParameterDto;

import java.util.List;

@Data
@Builder
public class AddProductionProcessTaskDto {
    private String name;
    private String description;
    private List<ParameterDto> parameters;
    private List<Long> previousTaskIds;
    private Long userId;
}
