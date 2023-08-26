package pl.edu.pk.wieik.productionScheduler.productionProcess.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduleDto;

import java.util.List;

@Data
@Builder
@ToString
public class ProductionProcessDto {
    private Long id;
    private String name;
    private List<ProductionProcessParameterDto> parameters;
    private List<ProductionProcessTaskDto> tasks;
    private List<ScheduleDto> schedules;
}
