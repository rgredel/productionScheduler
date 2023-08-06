package pl.edu.pk.wieik.productionScheduler.schedule.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class ScheduleDto {
    private Long id;
    private String name;
    private String file;
    private Long productionProcessId;
}
