package pl.edu.pk.wieik.productionScheduler.schedule.dto;

import lombok.*;

@Getter
@Setter
@Builder
@EqualsAndHashCode
@ToString
public class ScheduledTask {
    private int processor;
    private int timeUnit;
    private ScheduleTask task;
}
