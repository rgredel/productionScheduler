package pl.edu.pk.wieik.productionScheduler.schedule.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Builder
@Getter
@Setter
@ToString
public class ScheduledTasksForProcessor {
    private int processor;
    private List<TaskOnTimeUnitDto> tasks;
}
