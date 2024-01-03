package pl.edu.pk.wieik.productionScheduler.schedule.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Builder
@ToString
public class ScheduleWrapper<T> {
    private String processName;
    private Long processId;
    private List<T> scheduleData;
}
